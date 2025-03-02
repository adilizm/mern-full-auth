import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  selectConversationThunk,
} from "../redux/slices/conversationSlice";
import Seen_Svg from "./svgs/Seen_Svg";
import Delivred_svg from "./svgs/Delivred_svg";
import Sended_Svg from "./svgs/Sended_Svg";

function ConversationProfile({ participants, currentUserId }) {
  const otherUser = participants.find((p) => p._id !== currentUserId);
  return (
    <img
      className="rounded-full w-8 h-8"
      src={`${import.meta.env.VITE_API_BASE_URL}/${otherUser.profile}`}
      alt=""
    />
  );
}

function ConversationOnlineStatus({
  participants,
  onlineUsers,
  currentUserId,
}) {
  const otherUser = participants.find((p) => p._id !== currentUserId);
  return (
    <span
      className={`w-2.5 h-2.5 rounded-full absolute right-0.5 bottom-0.5 border-2 border-white ${
        onlineUsers.includes(otherUser._id) ? "bg-green-500" : "bg-red-600"
      }`}
    ></span>
  );
}

function ConversationName({ participants, currentUserId }) {
  const otherUser = participants.find((p) => p._id !== currentUserId);
  return <>{otherUser.username}</>;
}

function ConversationLastMessage({ conversation, currentUserId }) {
  const lastMessageContent = conversation.messages[0]?.content;
  const isCurrentUserMessage = conversation.messages[0]?.from == currentUserId;
  const is_seen = conversation.messages[0]?.is_seen;
  const is_delivred = conversation.messages[0]?.is_delivred;

  return isCurrentUserMessage ? (
    <div className="flex">
      <span className="mx-0.5 truncate max-w-40">{lastMessageContent}</span>{" "}
      {is_seen ? <Seen_Svg /> : ( is_delivred ? <Delivred_svg /> : <Sended_Svg/> )}
      
    </div>
  ) : (
    <>{lastMessageContent}</>
  );
}

function Conversations_List({
  contacts,
  currentUserId,
  onlineUsers,
  onSelect,
}) {
  const sortedContacts = [...contacts].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  return sortedContacts.map((conversation) => (
    <li
      onClick={() => onSelect(conversation)}
      key={conversation._id}
      className="px-2 py-1 hover:bg-gray-100 flex space-x-3 cursor-pointer"
    >
      <div className="relative">
        <ConversationProfile
          participants={conversation.participants}
          currentUserId={currentUserId}
        />
        <ConversationOnlineStatus
          participants={conversation.participants}
          currentUserId={currentUserId}
          onlineUsers={onlineUsers}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm">
          <ConversationName
            participants={conversation.participants}
            currentUserId={currentUserId}
          />
        </span>
        <span className="text-sm font-semibold">
          <ConversationLastMessage
            currentUserId={currentUserId}
            conversation={conversation}
          />
        </span>
      </div>
    </li>
  ));
}

function Conversations({ ontoggle_searching }) {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const currentUserId = useSelector((state) => state.users.user._id);
  const onlineUsers = useSelector((state) => state.sockets.online_users);

  useEffect(() => {
    dispatch(getConversations()).catch((err) =>
      console.error("Fetch error:", err)
    );
  }, [dispatch]);

  return (
    <div className="border border-gray-200 rounded-md col-span-1 md:col-span-2">
      <div className="flex justify-between p-2 relative">
        <h3 className="text-base font-semibold p-2 text-center text-gray-800">
          Contacts
        </h3>

        <button onClick={ontoggle_searching}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <ul className="flex flex-col space-y-2">
        {conversations && conversations.length > 0 ? (
          <Conversations_List
            contacts={conversations}
            currentUserId={currentUserId}
            onlineUsers={onlineUsers}
            onSelect={(conv) => dispatch(selectConversationThunk(conv))}
          />
        ) : (
          <p className="text-center text-gray-500">No conversations yet</p>
        )}
      </ul>
    </div>
  );
}

export default Conversations;
