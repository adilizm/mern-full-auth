import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationDetailes,
  PushMessage,
} from "../redux/slices/conversationSlice";
import moment from "moment";
import Sended_Svg from "./svgs/Sended_Svg";
import Delivred_svg from "./svgs/Delivred_svg";
import Seen_Svg from "./svgs/Seen_Svg";

function Chat() {
  const online_users = useSelector((state) => state.sockets.online_users);
  const sender_ID = useSelector((state) => state.users.user._id);
  const socket = useSelector((state) => state.sockets.socket);
  const message = useRef();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const fileref = useRef();
  const receiver_username = useSelector(
    (state) => state.conversations.receiver_username
  );
  const conversation_ID = useSelector(
    (state) => state.conversations.current_conversation?._id
  );
  const receiver_ID = useSelector((state) => state.conversations.receiver_ID);
  const receiver_profile = useSelector(
    (state) => state.conversations.receiver_profile
  );
  const current_conversation = useSelector(
    (state) => state.conversations.current_conversation
  );

  useEffect(() => {
    dispatch(getConversationDetailes({ username: receiver_username }))
      .unwrap()
      .then(() => {})
      .catch((err) => console.error(err));

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        sendDm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [receiver_username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [current_conversation]);

  const sendDm = () => {
    if (message.current.value.trim()) {
      socket.emit("new_message", {
        conversation_id: conversation_ID,
        from: sender_ID,
        to: receiver_ID,
        content: message.current.value,
      });

      message.current.value = null;
      message.current.focus();
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:col-span-4 flex flex-col justify-between">
      <div className="flex space-x-1.5">
        <img
          className="rounded-full w-10 h-10"
          src={import.meta.env.VITE_API_BASE_URL + "/" + receiver_profile}
          alt=""
        />
        <div className="flex flex-col ">
          <span className="text-md font-bold">{receiver_username}</span>

          {online_users.includes(receiver_ID) ? (
            <span className="text-sm font-semibold text-green-700">online</span>
          ) : (
            <span className="text-sm font-semibold text-red-700"> offline</span>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-end  md:max-h-[800px] overflow-visible  ">
        <div className="flex flex-col p-2 overflow-y-scroll relative max-h-[65vh] md:max-h-[800px] scrollbar scrollbar-thumb-amber-400  scrollbar-track-gray-50  ">
          {current_conversation?.messages.map((message, i) => (
            <Message_Content
              key={i}
              message={message}
              receiver_profile={receiver_profile}
            />
          ))}
          <div ref={messagesEndRef} className="mb-8"></div>
        </div>

        <div className="flex ">
          <div className="w-full p-2 relative ">
            <input
              id=""
              ref={message}
              className="bg-white m-0 w-full border   overflow-hidden border-gray-200 p-2 resize-none rounded-3xl outline-0"
            />
              <input type="file" ref={fileref} className="hidden" />
            <button
              onClick={() => {fileref.current.click()  }}
              className="absolute z-10 right-6 top-0 bottom-0 my-auto h-10 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm.72-5.03a.75.75 0 0 0 1.06 1.06l.97-.97v2.69a.75.75 0 0 0 1.5 0V8.06l.97.97a.75.75 0 1 0 1.06-1.06L8.53 5.72a.75.75 0 0 0-1.06 0L5.22 7.97Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              sendDm();
            }}
            className="bg-white border border-gray-200 p-2 rounded-full outline-0  my-auto h-10 flex items-center justify-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Message_Content({ message, receiver_profile }) {
  const _id_user = useSelector((state) => state.users.user._id);
  const messageRef = useRef(null);
  const socket = useSelector((state) => state.sockets.socket);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (_id_user != message.from && !message.is_seen) {
            socket.emit("message_seen", message);
          }
        }
      },
      { threshold: 0.85 } // Trigger when 85% of the message is visible
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current);
      }
    };
  }, [message]);

  return _id_user == message.from ? (
    <div
      ref={messageRef}
      className="my message my-0.5 text-end content flex space-x-1"
    >
      <div
        title={moment(message.createdAt).format("h:mm a")}
        className="w-fit ml-auto rounded-xl bg-emerald-900 p-1 text-white font-medium"
      >
        <p className="text-white font-medium">{message.content}</p>
        <section className="flex flex-end text-[10px] space-x-1 w-fit ml-auto">
          <span>{moment(message.createdAt).format("h:mm a")}</span>

          {message.is_seen ? (
            <Seen_Svg />
          ) : message.is_delivred ? (
            <Delivred_svg />
          ) : (
            <Sended_Svg />
          )}
        </section>
      </div>
    </div>
  ) : (
    <div ref={messageRef} className="my message my-0.5 text-start rounded-xl">
      <p
        title={moment(message.createdAt).format("h:mm:ss")}
        className="bg-gray-400 mr-auto p-1.5 w-fit rounded-xl text-white font-medium"
      >
        {message.content}
      </p>
    </div>
  );
}

export default Chat;
