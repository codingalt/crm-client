import React from "react";
import * as ai from "react-icons/ai";
import css from "./chat.module.scss";
import { useMediaQuery } from "@uidotdev/usehooks";
import Avvvatars from "avvvatars-react";

const ChatHeader = ({ selectedChat, activeChatMob, handleChatMob }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <div className={`${css.chatHeader} shadow-sm border`}>
      {selectedChat && (
        <>
          {/* Mobile Back Button  */}
          {activeChatMob && (
            <div
              className={`cursor-pointer w-9 h-9 md:h-10 md:w-10 -ml-2.5 mr-1 flex items-center justify-center hover:bg-default-100 rounded-full transition-all`}
            >
              <ai.AiOutlineArrowLeft
                onClick={() => handleChatMob(false)}
                style={{
                  color: "#01AB8E",
                }}
                className="text-lg md:text-xl"
              />
            </div>
          )}

          <div className={css.image}>
            <Avvvatars
              value={selectedChat?.seller?.name}
              size={isSmallDevice ? 30 : 45}
            />
            {/* <Image
              src={null}
              width={isSmallDevice ? 40 : 48}
              height={isSmallDevice ? 40 : 48}
              fallbackSrc={`https://placehold.co/${
                isSmallDevice ? "40x40" : "48x48"
              }`}
              radius="full"
              loading="lazy"
            /> */}
          </div>
          <div className={css.chatProfile}>
            <div className={css.name}>{selectedChat?.seller?.name}</div>
            <div className={css.onlineStatus}>Online</div>
          </div>

        </>
      )}
    </div>
  );
};

export default ChatHeader;
