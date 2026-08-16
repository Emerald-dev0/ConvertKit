import { ConversionFidelity } from "../domain/capability.js";
import { Converter } from "../domain/converter.js";
import { FileFormat } from "../domain/format.js";
import { PipelineConverter } from "../domain/pipeline.js";

/**
 * Manages the registration and resolution of converters.
 */
export class ConverterRegistry {
  private converters: Map<string, Converter> = new Map();

  /**
   * Registers a new converter.
   * If a converter with the same ID already exists, it will be overwritten.
   */
  register(converter: Converter): void {
    this.converters.set(converter.metadata.id, converter);
  }

  /**
   * Unregisters a converter by its ID.
   */
  unregister(converterId: string): void {
    this.converters.delete(converterId);
  }

  /**
   * Returns all registered converters.
   */
  getConverters(): Converter[] {
    return Array.from(this.converters.values());
  }

  /**
   * Finds all converters that support conversion between the given formats.
   */
  findConverters(from: FileFormat, to: FileFormat): Converter[] {
    return this.getConverters().filter((converter) =>
      converter.capabilities.some(
        (cap) => cap.from.id === from.id && cap.to.id === to.id
      )
    );
  }

  /**
   * Resolves the "best" converter for the given formats.
   * Prioritizes direct converters, then tries to find a pipeline.
   */
  resolveConverter(from: FileFormat, to: FileFormat): Converter | undefined {
    // 1. Try to find a direct converter
    const directMatches = this.findConverters(from, to);

    if (directMatches.length > 0) {
      if (directMatches.length === 1) {
        return directMatches[0];
      }

      // Sort by fidelity: HIGH > MEDIUM > LOW
      const fidelityOrder = {
        [ConversionFidelity.HIGH]: 3,
        [ConversionFidelity.MEDIUM]: 2,
        [ConversionFidelity.LOW]: 1,
      };

      return directMatches.sort((a, b) => {
        const getMaxFidelity = (c: Converter) => {
          const caps = c.capabilities.filter(
            (cap) => cap.from.id === from.id && cap.to.id === to.id
          );
          return Math.max(...caps.map((cap) => fidelityOrder[cap.fidelity]));
        };

        return getMaxFidelity(b) - getMaxFidelity(a);
      })[0];
    }

    // 2. No direct converter, try to find a path
    const path = this.findPath(from, to);
    if (path && path.length > 0) {
      return new PipelineConverter(path, from, to);
    }

    return undefined;
  }

  /**
   * Finds a sequence of converters that can transform 'from' to 'to'.
   * Uses Breadth-First Search (BFS) to find the shortest path.
   */
  findPath(from: FileFormat, to: FileFormat): Converter[] | undefined {
    const queue: { formatId: string; path: Converter[] }[] = [
      { formatId: from.id, path: [] },
    ];
    const visited = new Set<string>([from.id]);

    while (queue.length > 0) {
      const { formatId, path } = queue.shift()!;

      if (formatId === to.id) {
        return path;
      }

      const availableConverters = this.getConverters();
      for (const converter of availableConverters) {
        for (const cap of converter.capabilities) {
          if (cap.from.id === formatId && !visited.has(cap.to.id)) {
            visited.add(cap.to.id);
            queue.push({
              formatId: cap.to.id,
              path: [...path, converter],
            });
          }
        }
      }
    }

    return undefined;
  }
}
