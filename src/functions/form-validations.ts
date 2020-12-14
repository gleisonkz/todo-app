function isEmail(email: string): boolean {
  return !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email
  );
}

function isEmpty(value: string) {
  return !value.trim();
}

function setInvalidFor($element: HTMLElement, message: string): void {
  const $inputContainer = $element.parentElement;
  $inputContainer.setAttribute("data-error-message", message);
  $inputContainer.setAttribute("data-is-valid", "false");
  $element.setAttribute("data-is-valid", "false");
}

function setValidFor($element: HTMLElement): void {
  const $inputContainer = $element.parentElement;
  $inputContainer.setAttribute("data-is-valid", "true");
  $inputContainer.removeAttribute("data-error-message");
  $element.setAttribute("data-is-valid", "true");
}

function validateForm($elements: HTMLInputElement[]): boolean {
  return $elements.every(($element) => $element.dataset.isValid === "true");
}

export function convertFormValuesToObj<T>($form: HTMLFormElement): T {
  return Object.values($form.elements).reduce((obj: Object, field: HTMLFormElement) => {
    field.name && (obj[field.name] = field.value);
    return obj as any;
  }, {});
}

export { isEmail, setInvalidFor, setValidFor, validateForm, isEmpty };
