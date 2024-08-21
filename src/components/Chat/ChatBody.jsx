import React, { useContext, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import * as fi from "react-icons/fi";
import noChat from "@/assets/nochat.png";
import css from "./chat.module.scss";
import "./emoji.scss";
import { useSelector } from "react-redux";
import MessageSkeleton from "./MessageSkeleton";
import formatTimestamp from "@/hooks/customTimeFormatter";
import { DirectionContext } from "@/context/DirectionContext";
import Avvvatars from "avvvatars-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import FileUploader from "./FileUploader";
import { FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const ChatBody = ({
  messages,
  selectedChat,
  newMessage,
  files,
  setFiles,
  filePreviews,
  setFilePreviews,
  handleKeyDown,
  handleChange,
  handleSendMessage,
  isLoadingMessages,
  isLoadingSendMessage,
  setIsOpenMediaModal,
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const inputRef = useRef();
  const lastMessageRef = useRef(null);

  const { direction } = useContext(DirectionContext);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const checkMessageType = (message) => {
    if (
      message.sender_id === user?.id &&
      message.sender_type === `App\\Models\\User`
    ) {
      return 0;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    if (filePreviews?.length > 0) {
      inputRef?.current.focus();
    }
  }, [filePreviews, inputRef]);

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     if (lastMessageRef.current) {
  //       lastMessageRef.current.scrollIntoView({
  //         // behavior: "",
  //         block: "end",
  //       });
  //     }
  //   }, 0);
  // };

  const scrollToBottom = () => {
    lastMessageRef?.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div
        className={`${css.chatBody}`}
        style={!selectedChat ? { scrollbarWidth: "none" } : {}}
      >
        {isLoadingMessages ? (
          <MessageSkeleton />
        ) : selectedChat ? (
          messages?.map((message, index) => (
            <div
              className={
                checkMessageType(message) === 0 ? css.myMessage : css.messageBox
              }
              key={index}
              style={{
                flexDirection:
                  message.files && message.files.length > 0 ? "row" : undefined,
                gap: message.files && message.files.length > 0 ? 0 : undefined,
                zIndex: 30,
                paddingBottom: index === messages.length - 1 && "0px",
              }}
              // ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <div className="flex justify-end gap-x-2 md:gap-x-2.5">
                {checkMessageType(message) === 0 ? (
                  <div className={css.image}>
                    <Avvvatars
                      value={user?.name}
                      size={isSmallDevice ? 35 : 46}
                    />
                  </div>
                ) : (
                  <div className={css.image}>
                    <Avvvatars
                      value={selectedChat?.seller?.name}
                      size={isSmallDevice ? 35 : 46}
                    />
                  </div>
                )}

                <div className="max-w-80">
                  {message.body && message.body !== "" && (
                    <div
                      className={
                        checkMessageType(message) === 0
                          ? `${css.message} ${css.own} ${css.fileMessage}`
                          : `${css.message} ${css.fileMessage}`
                      }
                      style={
                        message.files && message.files.length > 0
                          ? {
                              backgroundColor: "transparent",
                              color: "#000",
                              padding: "0.1rem .4rem",
                              marginTop: ".4rem",
                            }
                          : {}
                      }
                    >
                      <span>{message.body}</span>
                      <span
                        style={
                          message.files && message.files.length > 0
                            ? { display: "none" }
                            : {}
                        }
                      >
                        {formatTimestamp(message.created_at)}
                      </span>
                    </div>
                  )}

                  {/* Show Mesage Files If attatched  */}
                  {message.files && message.files?.length > 0 && (
                    <div
                      className={
                        checkMessageType(message) === 0 ? `` : css.message
                      }
                      style={{
                        backgroundColor: "transparent",
                        padding: ".1rem .6rem",
                        paddingBottom: 0,
                        marginRight: 0,
                        paddingRight: 0,
                      }}
                    >
                      <div className="w-full mt-1 min-w-52 flex flex-wrap flex-col items-center justify-end gap-x-3 gap-y-4">
                        {message?.files?.map((file, index) => (
                          <div key={index} className="w-full h-full">
                            {file.type.startsWith("image/") ? (
                              <div className="w-full min-h-52 max-h-56 z-0 cursor-zoom-in overflow-hidden rounded-xl flex items-center justify-center object-cover">
                                <Image
                                  src={file.src}
                                  alt={file.name}
                                  className="object-cover align-middle w-full rounded-xl z-0"
                                  loading="lazy"
                                  onClick={() => setIsOpenMediaModal(file)}
                                />
                              </div>
                            ) : file.type.startsWith("video/") ? (
                              <div className="w-full md:h-full rounded-xl flex items-center justify-center">
                                <video
                                  controls
                                  src={file.src}
                                  alt={file.name}
                                  className="object-cover align-middle w-full h-full rounded-lg md:rounded-xl"
                                />
                              </div>
                            ) : (
                              <Link
                                to={file.src}
                                target="_blank"
                                download={file.src}
                              >
                                <div className="w-full max-w-sm flex items-center gap-x-3 py-2.5 px-4 pr-6 rounded-xl shadow border bg-slate-50 text-default-800 hover:text-blue-600 transition-all">
                                  <div className="w-12 h-12 bg-blue-500 text-2xl flex items-center justify-center rounded-xl">
                                    <FaFileAlt className="text-white" />
                                  </div>
                                  <span>{file?.name?.slice(0, 24)}</span>
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                        {/* TimeStamp  */}
                        <span
                          className="text-xs md:text-sm ml-auto -mt-1.5 text-default-600 text-right mr-0.5"
                          style={
                            message.files && message.files.length > 0
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {formatTimestamp(message.created_at)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : isSmallDevice ? (
          <MessageSkeleton />
        ) : (
          <div className={`${css.noChatMessage} hidden md:flex`}>
            <img src={noChat} alt="" />
            <span className="text-center">{t("tapOnChat")}</span>
          </div>
        )}

        {selectedChat ? (
          <div
            className={`${css.chatSender} border-t-1 md:border-none`}
            dir={direction}
          >
            {/* Upload File Button  */}
            <FileUploader
              setFiles={setFiles}
              filePreviews={filePreviews}
              setFilePreviews={setFilePreviews}
              isLoadingSendMessage={isLoadingSendMessage}
            />

            <InputEmoji
              value={newMessage}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              cleanOnEnter
              placeholder={t("typeYourMessage")}
              inputClass={css.inputMessageBox}
              ref={inputRef}
            />
            <button
              disabled={
                isLoadingSendMessage ||
                (files?.length === 0 && newMessage?.trim() === "")
                  ? true
                  : false
              }
              className={css.sendButton}
              onClick={handleSendMessage}
            >
              <fi.FiSend />
            </button>
          </div>
        ) : (
          ""
        )}

        {/* Last Messages Scroll div  */}
        <div ref={lastMessageRef} className="mt-10" />
      </div>
    </>
  );
};

export default ChatBody;
