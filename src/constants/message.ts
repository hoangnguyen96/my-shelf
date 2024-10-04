export const MESSAGES = {
  RESPONSE_ERROR: "The server is not responding. Please try again!",
  GET_ERROR: "The server does not respond. Retrieving data failed!",
  POST_ERROR: "The server does not respond. Please try again!",
  DELETE_ERROR: "Delete failed. Please try again!",
  EDIT_ERROR: "Edit failed. Please try again!",
  SUBMIT_ERROR: "Submit failed. Please try again!",
  UPDATE_SUCCESS: "You have update successful.",
  UPDATE_ERROR: "Update failed. Please try again!",
  CREATE_ERROR: "Create data failed. Please try again!",
  ADD_USER_FAILED: "Failed to add user!",
  REGISTER_SUCCESS: "You have successfully created an account.",
  CREATE_FAILED: "Account creation failed!",

  // Response Api
  LOGIN_SUCCESS: "You have successfully logged in.",
  LOGIN_FAILED: "Login failed!",
  INVALID_LOGIN: "Invalid login!",
  NETWORK_ERROR: "Network response was not ok!",
  EMAIL_EXISTS:
    "An account has been created with this email address. Please choose another one.",
  EMAIL_PASSWORD_INCORRECT: "Incorrect email or password!",
  EMAIL_PASSWORD_INVALID: "Email or Password is invalid!",
  UPLOAD_FAILED: "Failed to upload image!",
  ERROR_UPLOAD: "Error uploading image!",

  // Errors
  LOGIN_NOTFOUND: "User not found or password missing",
  INVALID_CREDENTIALS: "Invalid credentials",

  // Validation
  FIELD_REQUIRED: "This field is required.",
  NAME_REQUIRED: "Name is required.",

  // Dynamic error messages
  FORMAT: (ariaLabel: string) => `${ariaLabel} must be in correct format.`,

  // ConfirmPassword
  CONFIRM_PASSWORD: "Passwords do not match!",
};
