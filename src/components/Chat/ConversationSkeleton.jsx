import React from "react";
import css from "./chat.module.scss";
import { Skeleton } from "@mui/material";

const ConversationSkeleton = () => {
  const skeletonArray = Array.from({ length: 6 });

  return (
    <div className="h-full overflow-hidden scrollbar-hide">
      {skeletonArray.map((_, index) => (
        <li key={index}>
          <div className={css.image}>
            <Skeleton variant="circular" className="w-[43px] md:w-[52px]" height={"97%"} />
          </div>
          <div className={css.cDetail}>
            <div className={css.name}>
              <Skeleton variant="text" sx={{ fontSize: "1.06rem" }} className="w-24" />
            </div>
            <div className={css.preview}>
              <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} className="md:w-24 lg:w-32 xl:w-40" />
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ConversationSkeleton;
