export const getModifiersClasses = (
  modifiers?: Record<string, string>,
  selectedModifiers?: Record<string, boolean>
) => {
  let cls = '';
  if (modifiers && selectedModifiers) {
    Object.keys(modifiers).forEach((key) => {
      if (selectedModifiers[key]) {
        cls += ' ' + modifiers[key as keyof typeof modifiers];
      }
    });
  }
  return cls;
};
