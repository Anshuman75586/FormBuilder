import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';

export function FieldCreator({ onAddField }) {
  const [newField, setNewField] = useState({
    label: '',
    type: 'text',
    required: false,
    minLen: 0,
    maxLen: 255,
  });

  const [options, setOptions] = useState([]);
  const [currentOptionLabel, setCurrentOptionLabel] = useState('');

  const handleAddOption = () => {
    if (!currentOptionLabel) return;
    const val = currentOptionLabel.toLowerCase().replace(/\s+/g, '_');
    if (options.some(o => o.value === val)) return;
    setOptions([...options, { label: currentOptionLabel, value: val }]);
    setCurrentOptionLabel('');
  };

  const handleRemoveOption = (val) => {
    setOptions(options.filter(o => o.value !== val));
  };

  const showOptions = newField.type === 'select' || newField.type === 'checkbox' || newField.type === 'radio';

  const handleAdd = () => {
    if (!newField.label) return;
    
    const field = {
      id: crypto.randomUUID(),
      label: newField.label,
      type: newField.type,
      required: !!newField.required,
      minLen: newField.minLen,
      maxLen: newField.maxLen,
      placeholder: `Enter ${newField.label}`,
      options: showOptions ? (options.length > 0 ? options : [{ label: 'Option 1', value: 'opt1' }]) : undefined
    };
    
    onAddField(field);
    setNewField({
      label: '',
      type: 'text',
      required: false,
      minLen: 0,
      maxLen: 255,
    });
    setOptions([]);
  };

  return (
    <div className="space-y-4 bg-surface-container-low/20 p-5 border border-outline-variant/50 rounded-xl shadow-sm mb-8 transition-all hover:border-primary/20">
      <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Add Field</h3>
      
      <div className="space-y-1">
        <label htmlFor="new-field-label" className="text-xs font-semibold text-on-surface-variant">Field Label</label>
        <input 
          id="new-field-label"
          value={newField.label}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          className="w-full text-sm border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2.5 transition-all outline-none bg-white"
          placeholder="e.g. Phone Number" 
          type="text"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="new-field-type" className="text-xs font-semibold text-on-surface-variant">Field Type</label>
        <select 
          id="new-field-type"
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          className="w-full text-sm border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2.5 transition-all outline-none bg-white cursor-pointer"
        >
          <option value="text">Text Input</option>
          <option value="email">Email Input</option>
          <option value="number">Number Input</option>
          <option value="select">Select Dropdown</option>
          <option value="checkbox">Multi-checkbox</option>
          <option value="radio">Radio Group</option>
        </select>
      </div>

      <AnimatePresence>
        {newField.type === 'text' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-4 pt-2 border-t border-outline-variant/20 overflow-hidden"
          >
            <div className="flex-1 space-y-1">
              <label htmlFor="min-len" className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Min Length</label>
              <input 
                id="min-len"
                value={newField.minLen}
                onChange={(e) => setNewField({ ...newField, minLen: parseInt(e.target.value) || 0 })}
                className="w-full text-xs border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none bg-white font-medium"
                type="number"
                min="0"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label htmlFor="max-len" className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Max Length</label>
              <input 
                id="max-len"
                value={newField.maxLen}
                onChange={(e) => setNewField({ ...newField, maxLen: parseInt(e.target.value) || 0 })}
                className="w-full text-xs border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none bg-white font-medium"
                type="number"
                min="0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOptions && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pt-2 border-t border-outline-variant/20 overflow-hidden"
          >
            <label className="text-xs font-semibold text-on-surface-variant">Options</label>
            <div className="flex gap-2">
              <input 
                value={currentOptionLabel}
                onChange={(e) => setCurrentOptionLabel(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
                className="flex-1 text-xs border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none bg-white font-medium"
                placeholder="Option name..." 
                type="text"
              />
              <button 
                type="button"
                onClick={handleAddOption}
                aria-label="Add option"
                className="p-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {options.map(opt => (
                <span key={opt.value} className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[11px] font-bold text-on-surface border border-outline-variant/30 group">
                  {opt.label}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(opt.value)}
                    aria-label={`Remove option ${opt.label}`}
                    className="p-1 text-on-surface-variant hover:text-error transition-colors"
                  >
                    <X size={10} aria-hidden="true" />
                  </button>
                </span>
              ))}
              {options.length === 0 && <p className="text-[10px] italic text-on-surface-variant/60">No options added</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 py-1">
        <input 
          id="required"
          checked={newField.required}
          onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
          className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 cursor-pointer"
          type="checkbox"
        />
        <label className="text-xs font-bold text-on-surface cursor-pointer select-none" htmlFor="required">Required Field</label>
      </div>

      <button 
        type="button"
        onClick={handleAdd}
        disabled={!newField.label.trim()}
        aria-disabled={!newField.label.trim()}
        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-on-primary text-xs font-bold rounded-lg hover:opacity-95 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        <Plus size={16} aria-hidden="true" />
        Add Field
      </button>
    </div>
  );
}
