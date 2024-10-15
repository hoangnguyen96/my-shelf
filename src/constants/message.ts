export const MESSAGES = {
  // Response Api
  RESPONSE_ERROR: "The server is not responding. Please try again!",
  GET_ERROR: "The server does not respond. Retrieving data failed!",
  POST_ERROR: "The server does not respond. Please try again!",
  DELETE_ERROR: "Delete failed. Please try again!",
  UPDATE_SUCCESS: "You have update successful.",
  REGISTER_SUCCESS: "You have successfully created an account.",
  LOGIN_SUCCESS: "You have successfully logged in.",
  LOGIN_FAILED: "Login failed!",
  NETWORK_ERROR: "Network response was not ok!",
  EMAIL_EXISTS:
    "An account has been created with this email address. Please choose another one.",
  EMAIL_PASSWORD_INVALID: "Email or Password is invalid!",
  ERROR_UPLOAD: "Error uploading image!",
  UPLOAD_FAILED: "Failed to upload image!",
  UPDATE_ERROR: "Update failed. Please try again!",
  LOGIN_NOTFOUND: "User not found or password missing",
  INVALID_CREDENTIALS: "Invalid credentials",

  // Validation
  FIELD_REQUIRED: "This field is required.",
  NAME_REQUIRED: "Name is required.",
  CONFIRM_PASSWORD: "Passwords do not match!",
  FORMAT_PASSWORD:
    "Password must have minimum 8 characters and at least one uppercase letters, lowercase letters, numbers, and symbols",

  // Dynamic error messages
  FORMAT: (ariaLabel: string) => `${ariaLabel} must be in correct format.`,
};
