export const getFirstPath = (value: string) => {
  if (!value) {
    return "";
  }

  const parts = value.split("/");
  const basePath = `/${parts[1]}`;

  return basePath;
};
