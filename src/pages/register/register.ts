import { InputValidator } from "../../classes/input-validator";
import { validateForm } from "../../functions/validate-form";
import "../../style.scss";
import "./register.scss";

const $registerForm: any = document.querySelector("form");
const $registerButton: HTMLButtonElement = $registerForm.querySelector("button[type='submit']");

const [$userName, $email, $password, $passwordCheck]: HTMLInputElement[] = $registerForm;
const $inputs = [...$registerForm.querySelectorAll("input")];

/* ========================================================================== */
/* Monitorando o estado do form */
/* ========================================================================== */

InputValidator.set($userName).required().minLength(3);
InputValidator.set($email).required().validEmail();
InputValidator.set($password).required().minLength(6);
InputValidator.set($passwordCheck).required().match($password);

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
  alert("Deu certo");
});
