import { InputStatus } from "../enums/input-status.enum";

export function validateForm($elements: HTMLInputElement[]): boolean {
  return $elements.every(($element) => $element.dataset.isValid === InputStatus.Valid);
}
