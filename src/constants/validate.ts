const REGEX_EMAIL = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const REGEX_PASSWORD = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
);

const REGEX_PATTERN = {
  EMAIL: REGEX_EMAIL,
  PASSWORD: REGEX_PASSWORD,
};

const DEFAULT_LIMIT = 12;

export { REGEX_PATTERN, DEFAULT_LIMIT };
