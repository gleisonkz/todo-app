import { isEmpty, setInvalidFor, setValidFor } from "../functions/form-validations";
import { Validator } from "../models/validator";

export class Validators {
  validators: Validator[];

  constructor(private $element: HTMLInputElement) {
    this.$element.addEventListener("keyup", () => {
      const validator = this.validators.find((validator) => validator.expect());
      validator.action();
    });

    this.validators.push({
      expect: () => true,
      action: () => setValidFor($element),
    });
  }

  required(): Validators {
    this.validators.unshift({
      expect: () => isEmpty(this.$element.value),
      action: () => setInvalidFor(this.$element, `o campo ${this.$element.name} é obrigatório`),
    });

    return this;
  }

  minLength(minLength: number): Validators {
    this.validators.unshift({
      expect: () => this.$element.value && this.$element.value.length < minLength,
      action: () => setInvalidFor(this.$element, `deve conter no mínimo ${minLength} caracteres`),
    });

    return this;
  }

  maxLength(maxLength: number): Validators {
    this.validators.unshift({
      expect: () => this.$element.value && this.$element.value.length > maxLength,
      action: () => setInvalidFor(this.$element, `deve conter no máximo ${maxLength} caracteres`),
    });

    return this;
  }

  match($targetElement: HTMLInputElement) {
    this.validators.unshift({
      expect: () => this.$element.value !== $targetElement.value,
      action: () => setInvalidFor($targetElement, `as senhas não conferem`),
    });

    return this;
  }
}
