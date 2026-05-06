export function FormField({ field, value, onChange, onCheckboxChange }) {
  if (field.type === "text" || field.type === "email" || field.type === "number") {
    const isNumber = field.type === "number";
    const isEmail = field.type === "email";
    
    const inputType = isNumber ? "text" : field.type;
    
    let pattern = undefined;
    let title = undefined;
    
    if (isEmail) {
      pattern = ".*@gmail\\.com$";
      title = "Please enter a valid @gmail.com address";
    } else if (isNumber) {
      pattern = "^[0-9]{10}$";
      title = "Please enter exactly 10 digits (numbers only)";
    } else if (field.type === "text" && (field.minLen > 0 || field.maxLen > 0)) {
      title = `Must be between ${field.minLen || 0} and ${field.maxLen || 255} characters`;
    }

    return (
      <div className="relative">
        <input
          id={`field-${field.id}`}
          type={inputType}
          inputMode={isNumber ? "numeric" : undefined}
          placeholder={field.placeholder || " "}
          value={value ?? ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          required={field.required}
          pattern={pattern}
          title={title}
          minLength={field.type === "text" && field.minLen > 0 ? field.minLen : undefined}
          maxLength={field.type === "text" && field.maxLen > 0 ? field.maxLen : undefined}
          autoComplete={isEmail ? "email" : isNumber ? "off" : "on"}
          className="peer w-full text-sm bg-surface-container-low/20 border border-outline-variant/50 hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl p-3 outline-none transition-all placeholder:text-outline font-medium [&:not(:placeholder-shown):invalid]:border-error [&:not(:placeholder-shown):invalid]:text-error focus:[&:not(:placeholder-shown):invalid]:border-error focus:[&:not(:placeholder-shown):invalid]:ring-error/10"
        />
        <span className="hidden peer-[&:not(:placeholder-shown):invalid]:block text-xs font-bold text-error mt-1.5 ml-1">
          {title || "Invalid input format"}
        </span>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={`field-${field.id}`}
        value={value ?? ""}
        onChange={(e) => onChange(field.id, e.target.value)}
        required={field.required}
        className="w-full text-sm border border-outline-variant/50 hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl p-3 outline-none transition-all cursor-pointer font-medium appearance-none bg-surface-container-low/20"
      >
        <option value="">Select an option</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div
        role="group"
        aria-label={field.label}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {field.options?.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 p-3 bg-surface-container-low/20 border border-outline-variant/30 rounded-xl hover:border-primary/40 hover:bg-white transition-all cursor-pointer shadow-sm"
          >
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(opt.value)}
              onChange={(e) => onCheckboxChange(field.id, opt.value, e.target.checked)}
              className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm font-medium text-on-surface">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div
        role="group"
        aria-label={field.label}
        className="flex flex-wrap gap-3"
      >
        {field.options?.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 p-3 px-4 bg-surface-container-low/20 border border-outline-variant/30 rounded-xl hover:border-primary/40 hover:bg-white transition-all cursor-pointer shadow-sm"
          >
            <input
              type="radio"
              name={field.id}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(field.id, e.target.value)}
              className="w-4 h-4 text-primary border-outline-variant focus:ring-primary focus:ring-offset-0 cursor-pointer"
              required={field.required}
            />
            <span className="text-sm font-medium text-on-surface">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    );
  }

  return null;
}
