import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export default function AlertDialogModal({
  isOpen,
  onSafeClose,
  onClickAction,
  safeButtonName,
  actionButtonName,
}) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onSafeClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="2xl" fontWeight="extrabold">
              Discard Event
            </AlertDialogHeader>

            <AlertDialogBody fontSize="xl">
              Are you sure you want to discard creating the event?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="gray" ref={cancelRef} onClick={onSafeClose}>
                {safeButtonName}
              </Button>
              <Button colorScheme="red" onClick={onClickAction} ml={3}>
                {actionButtonName}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
