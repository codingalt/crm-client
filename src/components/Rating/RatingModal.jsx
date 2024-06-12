import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./RatingModal.module.scss";
import moment from "moment";
import * as rx from "react-icons/rx";
import * as md from "react-icons/md";
import Rating from "@mui/material/Rating";
import useClickOutside from "../../hooks/useClickOutside";
import { truncateText } from "../../utils/helpers/helpers";
import { toastError, toastSuccess } from "../Toast/Toast";
import { useSendRatingMutation } from "../../services/api/businessProfileApi/businessProfileApi";
import { Button, Textarea } from "@nextui-org/react";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { DirectionContext } from "../../context/DirectionContext";

const RatingModal = ({ show,data, setShow }) => {
  const { direction } = useContext(DirectionContext);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const ratingRef = useRef();

  const [sendRating, res] = useSendRatingMutation();
  const {isLoading, isSuccess, error} = res;

  const apiErrors = useApiErrorHandling(error);

  useEffect(()=>{
    if(isSuccess){
        setShow(false);
        toastSuccess("Rating submitted! Thanks");
    }
  },[isSuccess]);

   useEffect(() => {
     if (show) {
       setValue(0);
       setComment("");
     }
   }, [show]);

  useClickOutside(ratingRef, () => setShow(false));

  const handleSubmit = async() => {
    if(value === 0){
        toastError("Please select a rating");
        return;
    }

    await sendRating({id: data?.id, rating: value, comments: comment });
  }

  return (
    <div
      className={
        !show ? `${css.wrapper}` : `${css.activeRating} ${css.wrapper}`
      }
    >
      <div className={css.card} ref={ratingRef}>
        <div className={css.header}>
          <span>Appointment Summary</span>
          <span className="text-gray-300">
            {moment(data?.appointment_date).format("dddd, MMMM DD hh:mm a")}
          </span>
        </div>

        <div className={css.rideDetail}>
          <div className={css.top}>
            <div className={css.common}>
              <md.MdSocialDistance />
              <span
                className="text-[.93rem] md:text-[1.15rem] font-bold"
              >
                {truncateText(data?.service?.name, 14)}
              </span>
              <span
                style={{ fontWeight: "500", fontSize: ".9rem" }}
                className="text-gray-400 span2"
              >
                Service
              </span>
            </div>
            <div className={css.common}>
              <rx.RxTimer />
              <span className="text-[.93rem] md:text-[1.15rem] font-bold">
                {data?.service?.time} min
              </span>
              <span
                style={{ fontWeight: "500", fontSize: ".9rem" }}
                className="text-gray-400 span2"
              >
                Time
              </span>
            </div>
          </div>
          <div className={css.bottom}>
            <span>Total</span>
            <span>{data?.price} Nis</span>
          </div>
        </div>

        <div className={css.rate}>
          <h3>Rate Experience</h3>
          <Rating
            name="simple-controlled"
            size="large"
            value={value}
            sx={{ fontSize: "2rem" }}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            dir={direction}
          />
        </div>

        <div className="w-[82%] mx-auto">
          <Textarea
            variant="bordered"
            placeholder="Enter your feedback"
            isRequired
            value={comment}
            disableAnimation
            disableAutosize
            onChange={(e) => setComment(e.target.value)}
            classNames={{
              base: "",
              input: "resize-y min-h-[60px]",
            }}
            size="lg"
          />
        </div>

        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          className={css.ratingBtn}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default RatingModal;
