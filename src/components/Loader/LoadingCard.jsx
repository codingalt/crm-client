import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import ClipSpinner from './ClipSpinner';

const LoadingCard = ({ isOpen, onOpenChange }) => {

  return (
    <div className="w-full h-screen scrollbar-hide overflow-hidden">
      <Modal
        isOpen={true}
        size="xs"
        closeButton={<></>}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        backdrop="transparent"
        className="md:max-w-xs max-w-[60%]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="w-full flex items-center justify-center h-32 md:h-36">
                  <Spinner
                    label="Loading..."
                    color="success"
                    labelColor="success"
                    size="md"
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoadingCard