import { v4 as uuidv4 } from "uuid";

export const generateSevenDigitUUID = () => {
  const uuid = uuidv4().replace(/\D/g, "");
  return uuid.slice(0, 7);
};
