import React from "react";
import css from "./chat.module.scss";
import { useMediaQuery } from "@uidotdev/usehooks";
import Avvvatars from "avvvatars-react";

const Conversation = ({ chat, chatId, handleChatMob }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );

  return (
    <li
      onClick={handleChatMob}
      className={chat.id === parseInt(chatId) ? css.activeChat : ""}
    >
      <div className={css.image}>
        <Avvvatars value={chat.seller.name} size={isSmallDevice ? 43 : isMediumDevice ? 47 : isLargeDevice ? 47 : 51} />
      </div>
      <div className={css.cDetail}>
        <div className={css.name}>{chat.seller.name}</div>
        <div className={css.preview}>Click to View Messages.</div>
      </div>

      {/* Unread Message Count  */}
      {parseInt(chat?.unread_messages) > 0 && (
        <div className="absolute top-8 right-2.5 -mt-2">
          <div className="flex items-center justify-center w-6 h-6 md:w-5 md:h-5 xl:w-6 xl:h-6 shadow-md rounded-full bg-blue-500 text-white md:text-tiny xl:text-xs">
            {parseInt(chat.unread_messages) > 9 ? `9+` : chat.unread_messages}
          </div>
        </div>
      )}
    </li>
  );
};

export default Conversation;
