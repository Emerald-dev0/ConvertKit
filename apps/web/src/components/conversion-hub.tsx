"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  ArrowRight,
  Download,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  Terminal,
  Code2,
  ChevronRight
} from "lucide-react";

export type ConversionState = {
  success?: boolean;
  error?: string;
  output?: string; // Download URL
  format?: string;
  pipeline?: string[];
  metadata?: Record<string, unknown>;
  warnings?: string[];
};

interface ConversionHubProps {
  initialTargetFormat?: string;
  title?: React.ReactNode;
  description?: string;
}

export function ConversionHub({
  initialTargetFormat = "jpg",
  title,
  description
}: ConversionHubProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState(initialTargetFormat);
  const [state, setState] = useState<ConversionState>({});
  const [isPending, startTransition] = useTransition();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetFormat", targetFormat);

    startTransition(async () => {
      try {
        const response = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        setState(result);
      } catch {
        setState({ error: "Network or platform error occurred." });
      }
    });
  };

  const reset = () => {
    setFile(null);
    setState({});
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header / Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-3xl w-full text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-6">
          <FileCode2 size={14} />
          Universal Engine
        </div>
        <h1 className="text-5xl md:text-7xl mb-6 text-foreground font-display font-bold leading-[1.1]">
          {title || (
            <>
              The engine for <br />
              <span className="text-primary italic">every</span> conversion.
            </>
          )}
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {description || "Experience the ConvertKit infrastructure. Upload a file, choose your format, and see the core engine in action. No accounts, no latency."}
        </p>
      </motion.div>

      {/* Main UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-8"
      >
        {/* Left Side: Upload \u0026 Controls */}
        <section className="document-card rounded-xl p-8 md:p-10 flex flex-col gap-8">
          <h2 className="text-2xl font-bold border-b border-[#EAEAEA] pb-4">Configuration</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* File Dropzone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`
                relative group border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center transition-all
                ${file ? 'border-primary bg-mint' : 'border-[#EAEAEA] hover:border-muted'}
              `}
            >
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="p-4 bg-white rounded-full document-card mb-4 group-hover:scale-105 transition-transform">
                <Upload className={file ? 'text-primary' : 'text-muted'} size={24} />
              </div>
              <p className="text-sm font-medium text-center">
                {file ? file.name : "Drag and drop or click to upload"}
              </p>
              {file && (
                <p className="text-xs text-muted mt-2">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              )}
            </div>

            {/* Format Selection */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold tracking-wider uppercase text-muted">Target Format</label>
              <div className="flex gap-2 flex-wrap">
                {['jpg', 'png', 'webp', 'txt', 'json', 'html', 'pdf', 'mp4'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setTargetFormat(fmt)}
                    className={`
                      flex-1 min-w-[80px] py-3 px-4 rounded-lg text-sm font-bold transition-all border
                      ${targetFormat === fmt
                        ? 'bg-foreground text-white border-foreground'
                        : 'bg-white border-[#EAEAEA] hover:border-muted text-foreground'
                      }
                    `}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!file || isPending}
              className={`
                w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                ${!file || isPending
                  ? 'bg-[#EAEAEA] text-muted cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/10'
                }
              `}
            >
              {isPending ? (
                <RefreshCcw className="animate-spin" size={20} />
              ) : (
                <>
                  Convert Now
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </section>

        {/* Right Side: Results */}
        <section className="document-card rounded-xl p-8 md:p-10 flex flex-col gap-8 bg-[#FBFBFA]">
          <h2 className="text-2xl font-bold border-b border-[#EAEAEA] pb-4">Results</h2>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-center">
            <AnimatePresence mode="wait">
              {!state.success && !state.error && !isPending && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-[#EAEAEA] rounded-full flex items-center justify-center">
                    <ArrowRight size={32} />
                  </div>
                  <p>Configure and convert to see results</p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-mint rounded-full" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Processing...</h3>
                    <p className="text-muted text-sm tracking-tight">Applying infrastructure layer</p>
                  </div>
                </motion.div>
              )}

              {state.success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex flex-col gap-6"
                >
                  <div className="aspect-square w-full rounded-lg overflow-hidden border border-[#EAEAEA] bg-white relative group flex items-center justify-center">
                    {['jpg', 'png', 'webp'].includes(state.format || '') ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={state.output}
                        alt="Converted result"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-muted">
                        <div className="p-6 bg-mint rounded-full text-primary">
                          <CheckCircle2 size={48} />
                        </div>
                        <span className="font-mono uppercase text-xs tracking-widest">{state.format} File Ready</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-2 text-success font-bold">
                      <CheckCircle2 size={20} />
                      Conversion Successful
                    </div>

                    {state.pipeline && (
                      <div className="flex flex-col gap-2 items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Pipeline Path</span>
                        <div className="flex items-center gap-2 text-xs font-mono bg-white border border-[#EAEAEA] px-3 py-2 rounded-md">
                          {state.pipeline.map((step, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span>{step}</span>
                              {i < state.pipeline!.length - 1 && <ChevronRight size={12} className="text-muted" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {state.warnings && state.warnings.length > 0 && (
                      <div className="flex flex-col gap-2 w-full mt-4 bg-orange-50 border border-orange-100 p-3 rounded-md">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 flex items-center gap-1">
                          <AlertCircle size={10} />
                          Intelligence Note
                        </span>
                        {state.warnings.map((w, i) => (
                          <p key={i} className="text-[10px] text-orange-700 leading-tight italic">{w}</p>
                        ))}
                      </div>
                    )}

                    {state.metadata && (
                      <div className="flex flex-col gap-2 w-full mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted text-center">Technical Metadata</span>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-white border border-[#EAEAEA] p-3 rounded-md">
                          {Object.entries(state.metadata).map(([key, val]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-muted lowercase">{key}</span>
                              <span className="font-bold truncate">{String(val)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <a
                        href={state.output}
                        download={`converted.${state.format}`}
                        className="flex-1 bg-white border border-[#EAEAEA] hover:border-muted py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                      >
                        <Download size={18} />
                        Download
                      </a>
                      <button
                        onClick={reset}
                        className="p-3 bg-white border border-[#EAEAEA] hover:border-muted rounded-lg"
                      >
                        <RefreshCcw size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {state.error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4 text-destructive"
                >
                  <AlertCircle size={48} />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Error</h3>
                  <p className="text-muted text-sm">{state.error}</p>
                  <button
                    onClick={() => setState({})}
                    className="mt-4 px-6 py-2 border border-destructive/20 text-destructive rounded-lg font-bold hover:bg-destructive/5"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>

      {/* Developer Hub Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full max-w-4xl mt-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[#EAEAEA]" />
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted flex items-center gap-2">
            <Terminal size={14} />
            For Developers
          </h2>
          <div className="h-px flex-1 bg-[#EAEAEA]" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SDK Integration */}
          <div className="document-card rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                <Code2 size={20} />
              </div>
              <h3 className="font-bold">SDK Integration</h3>
            </div>
            <pre className="bg-[#111111] text-[#EAEAEA] p-5 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`import { convert } from "@convertkit/core";

// Programmatic usage
const result = await convert(file, {
  to: "${targetFormat}"
});`}
            </pre>
          </div>

          {/* CLI Usage */}
          <div className="document-card rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                <Terminal size={20} />
              </div>
              <h3 className="font-bold">CLI Usage</h3>
            </div>
            <pre className="bg-[#111111] text-[#EAEAEA] p-5 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`# Install CLI globally
npm install -g @convertkit/cli

# Run conversion
convertkit ${file?.name || "input.file"} -f ${targetFormat}`}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
