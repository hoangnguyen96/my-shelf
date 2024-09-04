"use client";

import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "../..";
import { CheckIcon } from "@app/assets/icons";

const ModalSuccessProgress = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} text="Open Modal" />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="165px 120px 65px" minW={484} alignItems="center">
          <ModalHeader textAlign="center">Process Completed</ModalHeader>

          <Box mt="165px" mb="200px">
            <CheckIcon />
          </Box>

          <ModalFooter>
            <Button onClick={onClose} text="Back" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSuccessProgress;
