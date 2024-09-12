import { getUserByEmail } from "@app/api-request";
import { MESSAGES } from "@app/constants";

export const isRequired = (value: string | null | undefined): boolean =>
  !!value;

export const isValidFormat = (value = "", pattern: RegExp): boolean =>
  pattern.test(value);

/**
 * @param requiredFields [] The required fields on form
 * @param dirtyFields [] The fields, which the users touched and fill data on
 * @param errors {} The errors fields
 * NOTE: If the user touched and fill data for the fields, which defined on array requiredFields and without errors message
 *  ==> The button should enable.
 * When the button enable AND user focusing on the last element
 * the UX: hit `enter` on the last field to submit form should work
 */
export const isEnableSubmitButton = (
  requiredFields: string[],
  dirtyFields: string[],
  errors: Record<string, unknown>
): boolean => {
  const isMatchAllRequiredFields: boolean = requiredFields.every((field) =>
    dirtyFields.includes(field)
  );

  return isMatchAllRequiredFields && errors && !Object.keys(errors).length;
};

export const validateRequired = (value: string | null): string | true =>
  isRequired(value?.trim()) || MESSAGES.FIELD_REQUIRED;

export const validateRegExpFormat = (
  value: string,
  pattern: RegExp,
  ariaLabel: string
): string | true =>
  isValidFormat(value.trim(), pattern) || MESSAGES.FORMAT(ariaLabel);

export const checkEmailExists = async (email: string) => {
  const data = await getUserByEmail(email);

  if (data?.length > 0) {
    return MESSAGES.EMAIL_EXISTS;
  }

  return true;
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
) => confirmPassword === password || MESSAGES.CONFIRM_PASSWORD;

/**
 * Validate password with the following criteria:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one symbol
 *
 * @param password - The password string to validate
 * @returns A string with the error message if invalid, or true if valid
 */
export const validatePassword = (password: string): true | string => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  return regex.test(password)
    ? true
    : "Password must have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol";
};
