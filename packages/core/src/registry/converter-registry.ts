import { ConversionFidelity } from "../domain/capability.js";
import { Converter } from "../domain/converter.js";
import { FileFormat } from "../domain/format.js";

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
   * Prioritizes converters with HIGH fidelity.
   */
  resolveConverter(from: FileFormat, to: FileFormat): Converter | undefined {
    const matches = this.findConverters(from, to);

    if (matches.length === 0) {
      return undefined;
    }

    if (matches.length === 1) {
      return matches[0];
    }

    // Sort by fidelity: HIGH > MEDIUM > LOW
    const fidelityOrder = {
      [ConversionFidelity.HIGH]: 3,
      [ConversionFidelity.MEDIUM]: 2,
      [ConversionFidelity.LOW]: 1,
    };

    return matches.sort((a, b) => {
      const getMaxFidelity = (c: Converter) => {
        const caps = c.capabilities.filter(
          (cap) => cap.from.id === from.id && cap.to.id === to.id
        );
        return Math.max(...caps.map((cap) => fidelityOrder[cap.fidelity]));
      };

      return getMaxFidelity(b) - getMaxFidelity(a);
    })[0];
  }
}
