export function convertFormValuesToObj<T>($form: HTMLFormElement): T {
  return Object.values($form.elements).reduce((obj: Object, field: HTMLFormElement) => {
    field.name && (obj[field.name] = field.value);
    return obj as any;
  }, {});
}
