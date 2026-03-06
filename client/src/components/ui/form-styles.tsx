/**
 * Standardized Form Input Styling
 * Use these classes for ALL form inputs across the platform for 100% consistency
 */

// Standard input styling for dark theme
export const inputStyles = {
  base: "bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-white/30 focus:bg-white/8 transition-colors",
  withIcon: "pl-12",
  error: "border-red-500/50 focus:border-red-500",
  disabled: "opacity-50 cursor-not-allowed"
};

// Standard select/dropdown styling
export const selectStyles = {
  trigger: "bg-white/5 border-white/10 text-white focus:border-white/30",
  content: "bg-slate-900 border-white/10",
  item: "text-white focus:bg-white/10 focus:text-white cursor-pointer"
};

// Standard textarea styling
export const textareaStyles = {
  base: "bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-white/30 focus:bg-white/8 resize-none transition-colors",
  error: "border-red-500/50 focus:border-red-500"
};

// Standard label styling
export const labelStyles = {
  base: "text-white font-medium text-sm",
  optional: "text-white/60 font-normal",
  required: "text-red-400"
};

// Standard form section styling
export const formSectionStyles = {
  container: "space-y-6",
  group: "space-y-2",
  row: "grid grid-cols-1 md:grid-cols-2 gap-4"
};

// Standard button group styling
export const buttonGroupStyles = {
  container: "flex flex-col sm:flex-row gap-4",
  centered: "flex flex-col sm:flex-row gap-4 justify-center",
  right: "flex flex-col sm:flex-row gap-4 justify-end"
};

/**
 * Helper function to combine input classes
 */
export function getInputClassName(
  hasIcon: boolean = false, 
  hasError: boolean = false,
  isDisabled: boolean = false,
  additionalClasses: string = ""
): string {
  const classes = [inputStyles.base];
  
  if (hasIcon) classes.push(inputStyles.withIcon);
  if (hasError) classes.push(inputStyles.error);
  if (isDisabled) classes.push(inputStyles.disabled);
  if (additionalClasses) classes.push(additionalClasses);
  
  return classes.join(" ");
}

/**
 * Helper function to combine textarea classes
 */
export function getTextareaClassName(
  hasError: boolean = false,
  additionalClasses: string = ""
): string {
  const classes = [textareaStyles.base];
  
  if (hasError) classes.push(textareaStyles.error);
  if (additionalClasses) classes.push(additionalClasses);
  
  return classes.join(" ");
}

/**
 * Standard form validation message component
 */
export function FormError({ message }: { message: string }) {
  return (
    <p className="text-sm text-red-400 mt-1">
      {message}
    </p>
  );
}

/**
 * Standard form helper text component
 */
export function FormHelperText({ text }: { text: string }) {
  return (
    <p className="text-sm text-white/60 mt-1">
      {text}
    </p>
  );
}

/**
 * Standard character count component for inputs
 */
export function CharacterCount({ 
  current, 
  max 
}: { 
  current: number; 
  max: number;
}) {
  const isNearLimit = current >= max * 0.9;
  const isOverLimit = current > max;
  
  return (
    <p className={`text-xs mt-1 text-right ${
      isOverLimit ? 'text-red-400' : 
      isNearLimit ? 'text-yellow-400' : 
      'text-white/60'
    }`}>
      {current} / {max}
    </p>
  );
}
