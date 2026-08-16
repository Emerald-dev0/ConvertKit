import { ConversionCapability, ConversionFidelity } from "./capability.js";
import { Converter, ConverterMetadata, ConversionOptions, ConversionResult } from "./converter.js";
import { FileFormat } from "./format.js";

/**
 * A virtual converter that chains multiple converters together.
 */
export class PipelineConverter implements Converter {
  readonly metadata: ConverterMetadata;
  readonly capabilities: readonly ConversionCapability[];

  constructor(private readonly pipeline: Converter[], from: FileFormat, to: FileFormat) {
    const ids = pipeline.map(c => c.metadata.id).join(' -> ');
    this.metadata = {
      id: `pipeline-${from.id}-to-${to.id}`,
      name: `Pipeline: ${from.name} to ${to.name}`,
      description: `Chained conversion: ${ids}`,
      version: "0.1.0",
    };

    // The capability of the pipeline is the start to the end
    this.capabilities = [{
      from,
      to,
      fidelity: ConversionFidelity.MEDIUM, // Pipelines are generally medium fidelity due to potential loss at each step
    }];
  }

  async validate(input: Uint8Array | ReadableStream, from: FileFormat): Promise<boolean> {
    if (this.pipeline.length === 0) return false;
    return this.pipeline[0].validate(input, from);
  }

  async convert(input: Uint8Array | ReadableStream, options: ConversionOptions): Promise<ConversionResult> {
    let currentData = input;

    for (let i = 0; i < this.pipeline.length; i++) {
      const converter = this.pipeline[i];
      const isLast = i === this.pipeline.length - 1;

      // Determine the next target format in the chain
      // If it's the last one, use the final target format
      // Otherwise, use the 'from' format of the next converter in the chain
      const nextTarget = isLast ? options.to : this.pipeline[i + 1].capabilities[0].from;

      const result = await converter.convert(currentData, {
        ...options,
        to: nextTarget
      });

      currentData = result.data;
    }

    return {
      data: currentData,
      format: options.to,
    };
  }

  /**
   * Returns the sequence of converters in this pipeline.
   */
  getSteps(): Converter[] {
    return [...this.pipeline];
  }
}
