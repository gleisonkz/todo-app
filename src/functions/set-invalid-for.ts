import { Attribute } from "../enums/attribute.enum";
import { InputStatus } from "../enums/input-status.enum";

export function setInvalidFor($element: HTMLElement, message: string): void {
  const $inputContainer = $element.parentElement;
  $inputContainer.setAttribute(Attribute.ErrorMessage, message);
  $inputContainer.setAttribute(Attribute.IsValid, InputStatus.Invalid);
  $element.setAttribute(Attribute.IsValid, InputStatus.Invalid);
}
