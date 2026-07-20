"use client";

interface OptionGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  defaultSelected?: string[];
  hint?: string;
}

/** Multi-select checkboxes that submit as repeated form fields */
export function OptionGroup({
  legend,
  name,
  options,
  defaultSelected = [],
  hint,
}: OptionGroupProps) {
  const selected = new Set(defaultSelected);

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-ink">{legend}</legend>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${name}-${option.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-mist bg-white px-3.5 py-2 text-sm transition-colors has-[:checked]:border-clay has-[:checked]:bg-clay/10 has-[:checked]:text-clay"
            >
              <input
                id={id}
                type="checkbox"
                name={name}
                value={option}
                defaultChecked={selected.has(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
