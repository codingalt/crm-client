import React, { useContext, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { DirectionContext } from "@/context/DirectionContext";
import { FaStar } from "react-icons/fa";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { truncateText } from "@/utils/helpers/helpers";
import moment from "moment";
import { useCancelAppointmentMutation } from "@/services/api/businessProfileApi/businessProfileApi";
import { toastSuccess } from "@/components/common/toast/Toast";
import { useApiErrorHandling } from "@/hooks/useApiErrors";

const ViewAppointmentDetailsModal = ({ isOpen, onOpenChange, data }) => {
  const { direction } = useContext(DirectionContext);

  // Cancel Booking
  const [cancelAppointment, res] = useCancelAppointmentMutation();
  const {
    isLoading: isLoadingCancelAppointment,
    isSuccess: isSuccessCancelAppointment,
    error: cancelAppointmentError,
  } = res;

  const handleCancelBooking = async (id, onClose) => {
    await cancelAppointment(id);

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isSuccessCancelAppointment) {
      toastSuccess("Booking Cancelled.");
    }
  }, [isSuccessCancelAppointment]);

  useApiErrorHandling(cancelAppointmentError);

  return (
    <Modal
      className="z-[9999] shadow-lg max-w-[89%] md:max-w-lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      hideCloseButton
      dir={direction}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center pt-5 md:pt-2">
                <div className="flex text-xl md:items-center gap-1 mb-3 font-semibold">
                  <p>Appointment Details</p>
                </div>

                <div
                  onClick={() => {
                    onClose();
                  }}
                  className="w-7 h-7 mb-4 rounded-full bg-blue-50 text-default-700 text-medium cursor-pointer hidden md:flex items-center justify-center"
                >
                  <IoClose />
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="rounded-lg pt-5 md:pt-0 pb-11 md:pb-14 md:px-8">
              <div className="w-full flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  {/* Left Side  */}
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg">
                      <ImagePlaceholder
                        src={
                          import.meta.env.VITE_SERVICE_IMAGE +
                          data?.service?.image
                        }
                        width="100%"
                        height="100%"
                        radius={"8px"}
                        alt="Service Image"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-lg md:text-xl max-w-xs">
                        {truncateText(data?.service?.name, 16)}
                      </p>
                      <div className="md:hidden flex items-center gap-0.5 md:gap-1 text-xs md:text-medium">
                        <FaStar className="text-yellow-500" />
                        <p className="mt-0.5 font-medium text-default-700">
                          5.0
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side  */}
                  <div className="hidden md:flex items-center gap-0.5 md:gap-1 text-sm md:text-medium">
                    <FaStar className="text-yellow-500" />
                    <p className="mt-0.5 font-medium text-default-700">5.0</p>
                  </div>
                </div>
              </div>

              {/* Divider  */}
              <div className="my-2.5 w-full h-[2px] bg-default-200"></div>

              {/* Details  */}
              <ul className="pt-2 pl-0">
                <li className="flex items-center justify-between mb-3">
                  <p className="text-default-600 font-medium text-sm">
                    Date & Time
                  </p>
                  <p className="font-medium text-sm md:text-medium">
                    {moment(data?.service?.appointment_date).format(
                      "MMM DD, YY"
                    )}{" "}
                    |{" "}
                    {moment(data?.service?.appointment_date).format("hh:mm A")}
                  </p>
                </li>
                <li className="flex items-center justify-between mb-3">
                  <p className="text-default-600 font-medium text-sm">
                    Servive Time
                  </p>
                  <p className="font-medium text-sm md:text-medium">
                    {data?.service?.time} mints
                  </p>
                </li>
                <li className="flex items-center justify-between mb-3">
                  <p className="text-default-600 font-medium text-sm">
                    Payment Method
                  </p>
                  <p className="font-medium text-sm md:text-medium">Cash</p>
                </li>
                <li className="flex items-center justify-between mb-3">
                  <p className="text-default-600 font-medium text-sm">Total</p>
                  <p className="font-medium text-sm md:text-medium">
                    {data?.service?.price} Nis
                  </p>
                </li>
              </ul>

              {/* Cancel Appointment Button  */}
              <Button
                variant="ghost"
                color="danger"
                size="lg"
                radius="sm"
                className="mt-4"
                isLoading={isLoadingCancelAppointment}
                onClick={() => handleCancelBooking(data?.id, onClose)}
              >
                Cancel Appointment
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewAppointmentDetailsModal;
