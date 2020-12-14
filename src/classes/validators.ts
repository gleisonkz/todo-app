import { isEmpty, setInvalidFor } from "../functions/form-validations";
import { Validator } from "../models/validator";

export abstract class Validators {
  static $element: HTMLInputElement;
  static elementValue: string;

  static required(): Validator {
    return {
      expect: () => isEmpty(this.elementValue),
      action: () => setInvalidFor(this.$element, `o campo ${this.$element.name}  é obrigatório`),
    };
  }

  static minLength(minLength: number): Validator {
    return {
      expect: () => this.elementValue && this.elementValue.length < minLength,
      action: () => setInvalidFor(this.$element, `mínimo de ${minLength} caracteres`),
    };
  }

  static validate($element: HTMLInputElement) {
    this.$element = $element;
    this.elementValue = $element.value;
    return this;
  }
}
