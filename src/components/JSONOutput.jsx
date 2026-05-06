import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function JSONOutput({ fields }) {
  const [copied, setCopied] = useState(false);

  const jsonContent = JSON.stringify(
    {
      schema: fields,
      metadata: {
        field_count: fields.length,
        updated_at: new Date().toISOString(),
      },
    },
    null,
    2,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mt-6 mb-12">
      <div className="flex items-center justify-between mb-4 border-b border-outline-variant/30 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">
            JSON Schema
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-primary font-bold text-xs hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors border border-primary/20"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy Schema"}
        </button>
      </div>
      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 rounded-2xl font-mono text-[13px] border border-outline/20 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            application/json
          </span>
        </div>
        <pre className="whitespace-pre-wrap overflow-x-auto selection:bg-primary/30 custom-scrollbar max-h-[400px]">
          {jsonContent}
        </pre>
      </div>
    </div>
  );
}
