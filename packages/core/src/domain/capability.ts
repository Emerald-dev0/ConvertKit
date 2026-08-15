import { FileFormat } from "./format.js";

/**
 * Expected fidelity of a conversion.
 */
export enum ConversionFidelity {
  /** High fidelity, aiming for near-perfect preservation of layout and content. */
  HIGH = "HIGH",
  /** Medium fidelity, preserves content but may lose complex formatting. */
  MEDIUM = "MEDIUM",
  /** Low fidelity, primarily for data or text extraction. */
  LOW = "LOW",
}

/**
 * Describes a specific conversion capability.
 */
export interface ConversionCapability {
  /** The input format supported. */
  readonly from: FileFormat;
  /** The output format produced. */
  readonly to: FileFormat;
  /** The expected fidelity of the conversion. */
  readonly fidelity: ConversionFidelity;
}
