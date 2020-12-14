import { Validators } from "../../classes/validators";
import {
  convertFormValuesToObj,
  isEmail,
  isEmpty,
  setInvalidFor,
  setValidFor,
  validateForm,
} from "../../functions/form-validations";
import { Validator } from "../../models/validator";
import "../../style.scss";
import "./register.scss";

const $registerForm: any = document.querySelector("form");
const $registerButton: HTMLButtonElement = $registerForm.querySelector("button[type='submit']");

const [$userName, $email, $password, $passwordCheck]: HTMLInputElement[] = $registerForm;
const $inputs = [...$registerForm.querySelectorAll("input")];

/* ========================================================================== */
/* Monitorando o estado do form */
/* ========================================================================== */

$userName.addEventListener("keyup", () => {
  const validators: Validator[] = [
    Validators.validate($userName).required(),
    Validators.validate($userName).minLength(2),
    {
      expect: () => true,
      action: () => setValidFor($userName),
    },
  ];
  const validator = validators.find((validator: Validator) => validator.expect());
  validator.action();
});

$email.addEventListener("keyup", () => {
  const emailValue = $email.value;
  const expectations = [
    {
      expect: () => emailValue && isEmail(emailValue),
      action: () => setInvalidFor($email, "email inválido"),
    },
    {
      expect: () => isEmpty(emailValue),
      action: () => setInvalidFor($email, "campo obrigatório"),
    },
    {
      expect: () => true,
      action: () => setValidFor($email),
    },
  ];

  const expected = expectations.find((expectation) => expectation.expect());
  expected.action();
});

$password.addEventListener("keyup", () => {
  const passwordValue = $password.value;
  const expectations = [
    {
      expect: () => passwordValue && $password.value.length < 6,
      action: () => setInvalidFor($password, "mínimo de 6 caracteres"),
    },
    {
      expect: () => isEmpty(passwordValue),
      action: () => setInvalidFor($password, "campo obrigatório"),
    },
    {
      expect: () => true,
      action: () => setValidFor($password),
    },
  ];

  const expected = expectations.find((expectation) => expectation.expect());
  expected.action();
});

$passwordCheck.addEventListener("keyup", () => {
  const passwordCheckValue = $passwordCheck.value;
  const expectations = [
    {
      expect: () => passwordCheckValue && passwordCheckValue.length < 6,
      action: () => setInvalidFor($passwordCheck, "mínimo de 6 caracteres"),
    },
    {
      expect: () => passwordCheckValue && passwordCheckValue !== $password.value,
      action: () => setInvalidFor($passwordCheck, "as senhas estão diferentes"),
    },
    {
      expect: () => isEmpty(passwordCheckValue),
      action: () => setInvalidFor($passwordCheck, "campo obrigatório"),
    },
    {
      expect: () => true,
      action: () => setValidFor($passwordCheck),
    },
  ];

  const expected = expectations.find((expectation) => expectation.expect());
  expected.action();
});

$inputs.forEach(($input) => {
  $input.addEventListener("keyup", () => {
    const formState = validateForm($inputs);
    $registerButton.disabled = !formState;
  });
});

$registerForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formState = validateForm($inputs);
  if (formState === false) return;

  const userObj = convertFormValuesToObj($registerForm);
  console.log(userObj);
});
