import { MESSAGES } from "@app/constants";

export const generateImageUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(MESSAGES.UPLOAD_FAILED);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(MESSAGES.ERROR_UPLOAD);
  }
};
