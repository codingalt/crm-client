import React, { useEffect, useRef, useState } from "react";
import css from "./chat.module.scss";
import Conversation from "./Conversation";
import * as bi from "react-icons/bi";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import {
  useGetConversationsQuery,
  useOneOoneCommunicationQuery,
  useReadMessagesMutation,
  useSendMessageMutation,
} from "@/services/api/chat/chatApi";
import ConversationSkeleton from "./ConversationSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { TbMessage } from "react-icons/tb";
import { useMediaQuery } from "@uidotdev/usehooks";
import ViewMediaModal from "./ViewMediaModal";
import { usePusherContext } from "@/context/PusherContext";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import useUserData from "@/hooks/useUserData";
import DataLoading from "@/components/common/loaders/DataLoading";
import LoginRequiredCard from "@/components/widgets/login-required-card";

const ChatSection = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const echo = usePusherContext();
  const searchParams = new URLSearchParams(location.search);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const chatId = searchParams.get("chatId");
  const chatIdRef = useRef(chatId);
  const [activeChatMob, setActiveChatMob] = useState(
    isSmallDevice ? (chatId ? true : false) : false
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(null);

  useEffect(() => {
    const mobileMenuBar = document.getElementById("mobileMenuBar");

    if (isSmallDevice) {
      if (activeChatMob) {
        mobileMenuBar.style.display = "none";
      } else {
        mobileMenuBar.style.display = "block";
      }
    }
  }, [activeChatMob, isSmallDevice]);

  // Update refs whenever these states change
  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  const handleChatMob = () => {
    if (isSmallDevice) {
      setActiveChatMob(true);
    }
  };

  const { user, isLoading: isLoadingUser } = useUserData();

  const props = {
    user_type: "client",
    receiver_id: selectedChat?.seller_id,
  };

  // Get Conversations
  const { data: conversations, isLoading: isLoadingConversations } =
    useGetConversationsQuery(props, {
      skip: !user || selectedChat,
      refetchOnMountOrArgChange: true,
    });

  // Read Messages Mutation
  const [readMessages, resp] = useReadMessagesMutation();

  const handleReadMessages = async (selectedChatId) => {
    // Update State Count First
    setChats((prevChats) => {
      return prevChats.map((chatItem) => {
        if (chatItem.id === selectedChatId) {
          return {
            ...chatItem,
            unread_messages: 0,
          };
        }
        return chatItem;
      });
    });

    // Send Request to Api
    await readMessages({
      communication_id: selectedChatId,
      user_type: "client",
    });
  };

  useEffect(() => {
    if (conversations) {
      setChats(conversations?.communications);
      setIsInitialLoading(false);
    }
  }, [conversations]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    const increaseUnreadMessages = (chatId) => {
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              unread_messages: (chat.unread_messages || 0) + 1,
            };
          }
          return chat;
        });
      });
    };

    // Array to store all subscribed channel names
    const subscribedChannels = [];

    if (echo && conversations) {
      // Listen to the private channels for the 'private_channel' event
      // Subscribe to Pusher channels for each communication/chat
      conversations.communications.forEach((item) => {
        const channelName = `chat.${item.id}`;
        subscribedChannels.push(channelName);

        echo.private(channelName).listen("NewMessage", (e) => {
          const currentChatId = chatIdRef.current;
          if (e?.message?.sender_type !== `App\\Models\\User`) {
            console.log(currentChatId);
            if (
              currentChatId &&
              parseInt(e.message.communication_id) === parseInt(currentChatId)
            ) {
              // Read Messages
              handleReadMessages(parseInt(currentChatId));
              // It means chat is open. process received message
              handleNewMessage(e);
            } else {
              // It means chat is closed. Increase unread_messages count
              increaseUnreadMessages(e.message.communication_id);
            }
          }
        });
      });
    }

    // Clean up the subscription when the component is unmounted
    return () => {
      subscribedChannels.forEach((channelName) => {
        if (echo) {
          echo.leave(channelName);
        }
      });
    };
  }, [conversations, echo]);

  // Get oneOone Communication | Messages
  const { data: messagesData } = useOneOoneCommunicationQuery(props, {
    refetchOnMountOrArgChange: true,
    skip: !selectedChat,
  });

  // Send Message Mutation
  const [sendMessage, res] = useSendMessageMutation();
  const { isLoading: isLoadingSendMessage } = res;

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData?.communication?.messages);
      setIsLoadingMessages(false);
    }
  }, [messagesData, activeChatMob]);

  // Check If ChatId is present in the Url
  useEffect(() => {
    if (chatId) {
      const chat = chats?.find((chat) => chat.id === parseInt(chatId));
      if (chat) {
        setSelectedChat(chat);

        // Read Messages
        if (parseInt(chat.unread_messages) > 0) {
          const debouncedHandleReadMessages = debounce(
            handleReadMessages,
            1000
          );
          debouncedHandleReadMessages(parseInt(chatId));
        }
      }
    }
  }, [chatId, chats]);

  const updateSearchParams = (newChatId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("chatId", newChatId);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  // Execute when any chat from left side is clicked
  const handleChatClick = (chat) => {
    if (selectedChat?.id != chat.id) {
      setIsLoadingMessages(true);
    }

    // Read Messages
    if (parseInt(chat.unread_messages) > 0) {
      const debouncedHandleReadMessages = debounce(handleReadMessages, 1000);
      debouncedHandleReadMessages(chat.id);
    }

    setMessages([]);
    setSelectedChat(chat);
    updateSearchParams(chat.id);
  };

  // Send Message
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" || files.length > 0) {
      if (files.length === 0) {
        setNewMessage("");
      }

      const tempId = `temp-${Date.now()}`;
      let formData = new FormData();
      if (newMessage?.trim() !== "") {
        formData.append("body", newMessage.trim());
      }
      formData.append("user_type", `client`);

      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
      }

      const tempMessage = {
        id: tempId,
        body: newMessage,
        communication_id: selectedChat.id,
        sender_id: user?.id,
        sender_type: `App\\Models\\User`,
        files: filePreviews,
        filePreviews: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (files.length === 0) {
        setMessages([...messages, tempMessage]);
      }
      const { data } = await sendMessage({
        chatId: selectedChat.id,
        data: formData,
      });

      if (files.length > 0) {
        setMessages([...messages, tempMessage]);
      }

      setFiles([]);
      setFilePreviews([]);
      setNewMessage("");

      if (!data || !data.success) {
        // If message failed to be sent
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== tempId)
        );
      }
    }
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter conversations based on search query
  const filteredConversations = chats?.filter((chat) =>
    chat.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingUser) {
    return <DataLoading />;
  }

  // Show Login Required Card if User is not logged in
  if (!isLoadingUser && !user) {
    return (
      <div className="pt-14">
        <LoginRequiredCard />
      </div>
    );
  }

  return (
    <>
      {/* View Media Modal  */}
      <ViewMediaModal
        isOpen={isOpenMediaModal}
        setIsOpen={setIsOpenMediaModal}
      />

      <div className="w-full xl:max-w-screen-xl md:max-w-screen-2xl mx-auto px-0 md:px-1 xl:px-4 pt-0 md:pt-6 pb-0 max-h-[79.5vh]">
        <div className={css.chatWrapper}>
          <div className={css.chatContainer}>
            <div
              className={`${css.chatLeft} shadow-sm border`}
              style={activeChatMob ? { display: "none" } : { display: "block" }}
            >
              <div className={css.cLeftHeading}>
                <span>{t("chats")}</span>
              </div>
              <div className={`${css.chatSearch}`}>
                <bi.BiSearch />
                <input
                  type="text"
                  value={searchQuery}
                  placeholder={t("search")}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Conversations  */}
              <div className={`${css.conversation} border-t-1`}>
                <ul
                  style={
                    isLoadingConversations ? { scrollbarWidth: "none" } : {}
                  }
                >
                  {isLoadingConversations ? (
                    <ConversationSkeleton />
                  ) : (
                    filteredConversations?.map((chat, index) => (
                      <div
                        key={chat.id}
                        onClick={() =>
                          chat.id === parseInt(chatId)
                            ? null
                            : handleChatClick(chat)
                        }
                      >
                        <Conversation
                          chat={chat}
                          chatId={chatId}
                          handleChatMob={handleChatMob}
                        />
                      </div>
                    ))
                  )}

                  {/* No Conversation Message  */}
                  {!isInitialLoading &&
                    !isLoadingConversations &&
                    chats?.length === 0 && (
                      <div className="w-full h-full flex gap-y-3 items-center justify-center px-20 text-center flex-col">
                        <TbMessage fontSize={60} color="#01AB8E" />
                        <p className="text-tiny text-default-500 font-medium">
                          {t("upComingChatsMessage")}
                        </p>
                      </div>
                    )}
                </ul>
              </div>
            </div>

            {/* Messages  */}
            {
              <div
                className={
                  activeChatMob
                    ? `${css.chatRight} ${css.active_chat_section}`
                    : css.chatRight
                }
              >
                <ChatHeader
                  selectedChat={selectedChat}
                  activeChatMob={activeChatMob}
                  handleChatMob={setActiveChatMob}
                />

                <div className={`${css.messageContainer} shadow-sm border`}>
                  <ChatBody
                    selectedChat={selectedChat}
                    newMessage={newMessage}
                    handleKeyDown={handleKeyDown}
                    handleChange={handleChange}
                    messages={messages}
                    handleSendMessage={handleSendMessage}
                    isLoadingMessages={isLoadingMessages}
                    files={files}
                    setFiles={setFiles}
                    filePreviews={filePreviews}
                    setFilePreviews={setFilePreviews}
                    isLoadingSendMessage={isLoadingSendMessage}
                    setIsOpenMediaModal={setIsOpenMediaModal}
                  />
                </div>
                {/* end of message container div  */}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSection;
