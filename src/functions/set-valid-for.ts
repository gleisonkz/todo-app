import { Attribute } from "../enums/attribute.enum";
import { InputStatus } from "../enums/input-status.enum";

export function setValidFor($element: HTMLElement): void {
  const $inputContainer = $element.parentElement;
  $inputContainer.setAttribute(Attribute.IsValid, InputStatus.Valid);
  $inputContainer.removeAttribute(Attribute.ErrorMessage);
  $element.setAttribute(Attribute.IsValid, InputStatus.Valid);
}
