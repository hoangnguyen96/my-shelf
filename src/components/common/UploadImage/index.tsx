"use client";

import { memo, useRef, useState } from "react";
import { Box, Input, FormControl, FormLabel } from "@chakra-ui/react";
import Image from "next/image";
import { Button } from "..";
import { User } from "@app/models";
import {
  generateImageUpload,
  updateUserById,
} from "@app/features/dashboard/actions";

interface ImageUploadFormProps {
  image: string;
  user: User;
}

const ImageUploadForm = ({ image, user }: ImageUploadFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      // Automatically submit the form after image selection
      await handleSubmit(file);
    }
  };

  const handleButtonClick = () => {
    // Trigger click event on input element
    inputFileRef.current?.click();
  };

  const handleSubmit = async (file: File) => {
    const data = await generateImageUpload(file);

    if (data.success) {
      const payload: Partial<User> = {
        ...user,
        avatar: data.data.url,
      };

      return await updateUserById(user.id as string, payload);
    } else {
      console.error("Upload failed:", data.error.message);
      return;
    }
  };

  return (
    <Box as="form" encType="multipart/form-data">
      <FormControl id="myFile" mb={4}>
        <FormLabel htmlFor="fileInput" margin="0 auto">
          <Image
            src={imagePreview || image}
            alt="Upload"
            width={110}
            height={110}
            priority={true}
            fetchPriority="high"
            style={{
              margin: "0 auto",
              borderRadius: "50%",
              width: "110px",
              height: "110px",
            }}
          />
        </FormLabel>
        <Input
          id="fileInput"
          data-testid="fileInput"
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          display="none"
        />
      </FormControl>
      <Button
        size="xs"
        variant="outline"
        text="Upload New photo"
        border="none"
        boxShadow="unset"
        textDecor="underline"
        color="colorDescription"
        textUnderlineOffset="2px"
        _hover={{ bgColor: "transparent" }}
        onClick={handleButtonClick}
      />
    </Box>
  );
};

export default memo(ImageUploadForm);
