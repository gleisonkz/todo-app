export interface Validator {
  expect: () => boolean;
  action: () => void;
}
