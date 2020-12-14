import { Validators } from "./validators";

export abstract class InputValidator {
  static set($element: HTMLInputElement): Validators {
    return new Validators($element);
  }
}
