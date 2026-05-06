import { Reorder } from 'motion/react';
import { GripVertical, Trash2, MoveVertical } from 'lucide-react';
import { FieldCreator } from './FieldCreator';

export function BuilderPanel({ fields, onAddField, onRemoveField, onReorder }) {
  return (
    <aside className="relative z-50 h-full w-[310px] md:w-[320px] bg-white border-r border-outline-variant/30 flex flex-col shadow-sm">
      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-on-surface tracking-tight">Build Your Form</h2>
          <p className="text-sm text-on-surface-variant font-medium">Design your custom form</p>
        </div>

        <FieldCreator onAddField={onAddField} />

        <div className="space-y-4">
          <div className="flex flex-col gap-1 border-b border-outline-variant/30 pb-3">
            <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Fields({fields.length})</h3>
            {fields.length > 1 && (
              <div className="flex items-center gap-2 p-2 bg-surface-container-low/50 rounded-lg border border-outline-variant/20">
                <MoveVertical size={14} className="text-primary/60" />
                <span className="text-[10px] font-medium text-on-surface-variant">Drag to reorder</span>
              </div>
            )}
          </div>
          
          <Reorder.Group axis="y" values={fields} onReorder={onReorder} className="space-y-2">
            {fields.map((field) => (
              <Reorder.Item 
                key={field.id} 
                value={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex items-center justify-between p-3 bg-white hover:bg-surface-container transition-all border border-outline-variant/50 rounded-sm shadow-sm cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-surface-container rounded-xs transition-colors group-hover:bg-primary/10 group-hover:text-primary text-outline">
                    <GripVertical className="cursor-grab active:cursor-grabbing" size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface leading-none">{field.label}</span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter mt-1">{field.type}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    type="button"
                    onClick={() => onRemoveField(field.id)}
                    aria-label={`Remove ${field.label} field`}
                    className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          
          {fields.length === 0 && (
            <div className="py-10 text-center border-2 border-dashed border-outline-variant/30 rounded-lg bg-surface-container-lowest/50">
               <p className="text-xs font-semibold text-on-surface-variant/40">Canvas is empty</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
