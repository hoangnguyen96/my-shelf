"use client";

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Button } from "../common";
import { memo } from "react";

interface ModalDeleteBookProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalDeleteBook = ({
  isOpen = false,
  onClose,
  onConfirm,
}: ModalDeleteBookProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent p="40px" minW={484} alignItems="center">
      <ModalHeader textAlign="center">
        Are you sure to delete this book?
      </ModalHeader>

      <ModalFooter gap="20px">
        <Button
          data-testid="confirm-delete"
          onClick={onConfirm}
          text="Yes"
          size="md"
          variant="normal"
        />
        <Button onClick={onClose} text="No" size="md" variant="outline" />
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default memo(ModalDeleteBook);
