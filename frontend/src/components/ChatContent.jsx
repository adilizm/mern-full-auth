import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmitMessage,
  getConversationDetailes,
} from "../redux/slices/conversationSlice";
import moment from "moment";
import Sended_Svg from "./svgs/Sended_Svg";
import Delivred_svg from "./svgs/Delivred_svg";
import Seen_Svg from "./svgs/Seen_Svg";
import ImageFilePreview from "./ImageFilePreview";
import EmojiPicker from "emoji-picker-react";
import Emoji_svg from "./svgs/Emoji_svg";
import Image_svg from "./svgs/Image_svg";
import Send_svg from "./svgs/Send_svg";

function Chat() {
  const online_users = useSelector((state) => state.sockets.online_users);
  const sender_ID = useSelector((state) => state.users.user._id);
  const [hasImageFile, setHasImageFile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [files, setfiles] = useState();
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
      dispatch(
        EmitMessage({
          conversation_id: conversation_ID,
          from: sender_ID,
          to: receiver_ID,
          content: message.current.value,
        })
      );
      message.current.value = null;
      message.current.focus();
    }
  };

  const handleEmoji = (emojiData) => {
    if (message.current) {
      message.current.value += emojiData.emoji;
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array

    if (files.length > 0) {
      setHasImageFile(true);
      setfiles(files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prevItems) => [...prevItems, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const closeFilePreview = () => {
    setHasImageFile(false);
    setImagePreview([]);
    setfiles(null);
    message.current.value = "";
  };

  const divStyle = {
    backgroundImage:
      "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
  };

  return (
    <div
      style={divStyle}
      className="bg-gray-50 border relative border-gray-200 rounded-md p-2 md:col-span-4 flex flex-col justify-between"
    >
      {hasImageFile && (
        <ImageFilePreview
          images={imagePreview}
          files={files}
          messageContent={message.current.value}
          onClose={closeFilePreview}
        />
      )}

      <div className="flex justify-between">
        <div className="flex space-x-1.5 ">
          <img
            className="rounded-full w-10 h-10"
            src={import.meta.env.VITE_API_BASE_URL + "/" + receiver_profile}
            alt=""
          />
          <div className="flex flex-col ">
            <span className="text-md font-bold">{receiver_username}</span>

            {online_users.includes(receiver_ID) ? (
              <span className="text-sm font-semibold text-green-700">
                online
              </span>
            ) : (
              <span className="text-sm font-semibold text-red-700">
                {" "}
                offline
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 px-2">
        {/*   <button className=" cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="36"
              height="36"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <defs>
                <linearGradient id="a">
                  <stop offset="0" stopColor="#d4bdff"></stop>
                  <stop offset="1" stopColor="#8655ff"></stop>
                </linearGradient>
                <radialGradient
                  id="d"
                  cx="37.033"
                  cy="45.087"
                  r="320.172"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#e9e0ff"></stop>
                  <stop
                    offset=".556"
                    stopColor="#dccaff"
                    stopOpacity=".444"
                  ></stop>
                  <stop offset="1" stopColor="#d4bdff" stopOpacity="0"></stop>
                </radialGradient>
                <linearGradient id="b">
                  <stop offset="0" stopColor="#cbbaff"></stop>
                  <stop
                    offset=".234"
                    stopColor="#cebeff"
                    stopOpacity=".766"
                  ></stop>
                  <stop
                    offset=".48"
                    stopColor="#d8cbff"
                    stopOpacity=".52"
                  ></stop>
                  <stop
                    offset=".732"
                    stopColor="#e8e0ff"
                    stopOpacity=".268"
                  ></stop>
                  <stop
                    offset=".987"
                    stopColor="#fefdff"
                    stopOpacity=".013"
                  ></stop>
                  <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                </linearGradient>
                <radialGradient
                  xlinkHref="#b"
                  id="f"
                  cx="156.383"
                  cy="201.064"
                  r="22.426"
                  fx="141.294"
                  fy="185.309"
                  gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <linearGradient
                  xlinkHref="#a"
                  id="g"
                  x1="55.192"
                  x2="430.198"
                  y1="99.872"
                  y2="474.879"
                  gradientUnits="userSpaceOnUse"
                ></linearGradient>
              </defs>
              <g>
                <linearGradient id="a">
                  <stop offset="0" stopColor="#d4bdff"></stop>
                  <stop offset="1" stopColor="#8655ff"></stop>
                </linearGradient>
                <linearGradient
                  xlinkHref="#a"
                  id="c"
                  x1="58.039"
                  x2="452.133"
                  y1="58.039"
                  y2="452.133"
                  gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <radialGradient
                  id="d"
                  cx="37.033"
                  cy="45.087"
                  r="320.172"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#e9e0ff"></stop>
                  <stop
                    offset=".556"
                    stopColor="#dccaff"
                    stopOpacity=".444"
                  ></stop>
                  <stop offset="1" stopColor="#d4bdff" stopOpacity="0"></stop>
                </radialGradient>
                <linearGradient id="b">
                  <stop offset="0" stopColor="#cbbaff"></stop>
                  <stop
                    offset=".234"
                    stopColor="#cebeff"
                    stopOpacity=".766"
                  ></stop>
                  <stop
                    offset=".48"
                    stopColor="#d8cbff"
                    stopOpacity=".52"
                  ></stop>
                  <stop
                    offset=".732"
                    stopColor="#e8e0ff"
                    stopOpacity=".268"
                  ></stop>
                  <stop
                    offset=".987"
                    stopColor="#fefdff"
                    stopOpacity=".013"
                  ></stop>
                  <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                </linearGradient>
                <radialGradient
                  xlinkHref="#b"
                  id="e"
                  cx="287.66"
                  cy="255.489"
                  r="108.275"
                  gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <radialGradient
                  xlinkHref="#b"
                  id="f"
                  cx="156.383"
                  cy="201.064"
                  r="22.426"
                  fx="141.294"
                  fy="185.309"
                  gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <linearGradient
                  xlinkHref="#a"
                  id="g"
                  x1="55.192"
                  x2="430.198"
                  y1="99.872"
                  y2="474.879"
                  gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <path
                  fill='url("#a")'
                  d="M512 256c-1.5 85.6-16.6 154.5-59.7 196.3-41.8 43.1-110.7 58.2-196.3 59.7-85.6-1.5-154.5-16.6-196.3-59.7C16.6 410.5 1.5 341.6 0 256c1.5-85.6 16.6-154.5 59.7-196.3C101.5 16.6 170.4 1.5 256 0c85.6 1.5 154.5 16.6 196.3 59.7 43.1 41.8 58.2 110.7 59.7 196.3z"
                  opacity="1"
                ></path>
                <path
                  fill='url("#d")'
                  d="M512 256c-1.5 85.6-16.6 154.5-59.7 196.3-41.8 43.1-110.7 58.2-196.3 59.7-85.6-1.5-154.5-16.6-196.3-59.7C16.6 410.5 1.5 341.6 0 256c1.5-85.6 16.6-154.5 59.7-196.3C101.5 16.6 170.4 1.5 256 0c85.6 1.5 154.5 16.6 196.3 59.7 43.1 41.8 58.2 110.7 59.7 196.3z"
                  opacity="1"
                ></path>
                <path
                  fill="#FFFFFF"
                  d="M307.3 355.6H146.5c-19.9 0-36-16.1-36-36V192.4c0-19.9 16.1-36 36-36h160.9c19.9 0 36 16.1 36 36v127.1c-.1 20-16.2 36.1-36.1 36.1z"
                  opacity="1"
                ></path>
                <path
                  fill="#FFFFFF"
                  d="m391.5 349.8-48.2-27.9V190.1l48.2-27.9c4.5-2.6 10 .6 10 5.8v176c0 5.1-5.6 8.3-10 5.8z"
                  opacity="1"
                ></path>
                <path
                  fill='url("#b")'
                  d="m391.5 349.8-48.2-27.9V190.1l48.2-27.9c4.5-2.6 10 .6 10 5.8v176c0 5.1-5.6 8.3-10 5.8z"
                  opacity="1"
                ></path>
                <circle
                  cx="156.4"
                  cy="201.1"
                  r="22.4"
                  fill='url("#f")'
                  opacity="1"
                ></circle>
                <circle
                  cx="151.1"
                  cy="195.7"
                  r="17.1"
                  fill='url("#g")'
                  opacity="1"
                ></circle>
              </g>
            </svg>
          </button>
          <button className=" cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="36"
              height="36"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              
            >
              <defs>
                <linearGradient
                  id="a"
                  x1="6.302"
                  x2="505.815"
                  y1="262.257"
                  y2="249.91"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopOpacity="1" stopColor="#0f7c15" offset="0"></stop>
                  <stop stopOpacity="1" stopColor="#56dd53" offset="1"></stop>
                </linearGradient>
              </defs>
              <g>
                <linearGradient
                  id="a"
                  x1="6.302"
                  x2="505.815"
                  y1="262.257"
                  y2="249.91"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopOpacity="1" stopColor="#0f7c15" offset="0"></stop>
                  <stop stopOpacity="1" stopColor="#56dd53" offset="1"></stop>
                </linearGradient>
                <g fillRule="evenodd">
                  <path
                    fill='url("#a")'
                    d="M256.087.083c141.376 0 256 114.587 256 256.035 0 141.377-114.623 255.964-256 255.964S.084 397.5.084 256.118C.084 114.67 114.7.083 256.087.083z"
                    opacity="1"
                   
                    
                  ></path>
                  <path
                    fill="#FFFFFF"
                    d="M394.266 387.5 316 309.232 300.522 324.7a14.219 14.219 0 0 1-18.4 1.527c-8.98-6.391-17.636-13.284-25.994-20.466q-13.345-11.461-25.788-23.935-12.435-12.436-23.94-25.788c-7.179-8.359-14.075-17.014-20.463-26a14.206 14.206 0 0 1 1.524-18.393l15.472-15.475-78.268-78.27-17.1 17.1a37.715 37.715 0 0 0-10.832 34.374c4.853 27.456 17.45 54.574 31.9 78.233 16.737 27.4 37.6 52.955 60.285 75.642s48.236 43.544 75.639 60.281c23.656 14.45 50.774 27.05 78.23 31.9a37.732 37.732 0 0 0 34.379-10.83zm-70.6-85.94 11.413-11.416a9.413 9.413 0 0 1 13.27 0l65 65a9.408 9.408 0 0 1 0 13.27l-11.413 11.415-78.269-78.268zM132.333 110.232l11.416-11.416a9.421 9.421 0 0 1 13.27 0l65 65a9.416 9.416 0 0 1 0 13.27L210.605 188.5z"
                    opacity="1"
                    
                  ></path>
                </g>
              </g>
            </svg>
          </button> */}
        </div>
      </div>

      <div className=" flex-col justify-end md:max-h-[737px] overflow-visible  ">
        <div className="flex flex-col p-2 overflow-y-scroll relative max-h-[65vh] md:max-h-[737px] scrollbar scrollbar-thumb-amber-400  scrollbar-track-gray-50  ">
          {current_conversation?.messages.map((message, i) => (
            <Message_Content
              key={i}
              message={message}
              last_message={current_conversation?.messages[i - 1]}
              next_message={current_conversation?.messages[i + 1]}
              receiver_profile={receiver_profile}
            />
          ))}
          <div ref={messagesEndRef} className="mb-8"></div>
        </div>
      </div>
      <div className="flex relative">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Emoji_svg />
        </button>
        <div className=" absolute bottom-13 right-0 left-0 ">
          <EmojiPicker
            open={showEmojiPicker}
            lazyLoadEmojis={true}
            onEmojiClick={handleEmoji}
            previewConfig={{
              showPreview: false,
            }}
            searchDisabled={true}
            width="100%"
          />
        </div>
        <div className="w-full p-2 relative ">
          <input
            id=""
            ref={message}
            className="bg-white m-0 w-full border   overflow-hidden border-gray-200 p-2 resize-none rounded-3xl outline-0"
          />
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/bmp, image/tiff"
            ref={fileref}
            className="hidden"
            multiple
          />
          <button
            onClick={() => {
              fileref.current.click();
            }}
            className="absolute z-10 right-6 top-0 bottom-0 my-auto h-10 "
          >
            <Image_svg />
          </button>
        </div>

        <button
          onClick={() => {
            setShowEmojiPicker(false);
            sendDm();
          }}
          className="bg-white border border-gray-200 p-2 rounded-full outline-0  my-auto h-10 w-10 flex items-center justify-center "
        >
          <Send_svg />
        </button>
      </div>
    </div>
  );
}

function Message_Content({
  message,

  receiver_profile,

  last_message,
  next_message,
}) {
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
      <div className="w-fit ml-auto rounded-xl bg-orange-500 p-1 text-white font-medium">
        <Images message={message} />

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
    <div ref={messageRef} className=" w-full  message my-0.5  ">
      <div className="w-fit mr-auto rounded-xl bg-gray-200 text-white font-medium">
        <Images message={message} />
      </div>
      <p
        title={moment(message.createdAt).format("h:mm:ss")}
        className="bg-white border border-gray-200 mr-auto p-1.5 px-2.5 w-fit rounded-xl text-black font-base"
      >
        {message.content}{" "}
        <section className="flex -my-1 p-0 flex-end text-[10px] space-x-1 w-fit mr-auto">
          <span>{moment(message.createdAt).format("h:mm a")}</span>
        </section>
      </p>

      {((last_message?.from != message?.from &&
        next_message?.from != message.from) ||
        (last_message?.from == message?.from &&
          next_message?.from != message.from)) && (
        <span className="flex  items-center space-x-1 ">
          <img
            className="rounded-full w-6 h-6 -ml-2 -my-2 border-2 object-cover border-white"
            src={import.meta.env.VITE_API_BASE_URL + "/" + receiver_profile}
            alt=""
          />
        </span>
      )}
    </div>
  );
}

function Images({ message }) {
  const isMultiplefiles = message.files_info.length > 1;

  if (!message.has_file) return;

  if (isMultiplefiles && message.files_info.length >= 5)
    return (
      <>
        <div className="grid grid-cols-2 p-2 gap-0.5 relative ">
          <span className=" absolute p-2 h-14 w-14 rounded-full text-black flex items-center justify-center text-2xl top-6/12 right-6/12 translate-x-2/4 -translate-y-2/4 bg-white">
            +{message.files_info.length - 4}
          </span>
          <img
            src={import.meta.env.VITE_API_BASE_URL + message.files_info[0]}
            className="rounded-md h-40 object-cover w-full"
          />
          <img
            src={import.meta.env.VITE_API_BASE_URL + message.files_info[1]}
            className="rounded-md h-40 object-cover w-full"
          />
          <img
            src={import.meta.env.VITE_API_BASE_URL + message.files_info[2]}
            className="rounded-md h-40 object-cover w-full"
          />
          <img
            src={import.meta.env.VITE_API_BASE_URL + message.files_info[3]}
            className="rounded-md h-40 object-cover w-full"
          />
        </div>
      </>
    );

  if (isMultiplefiles && message.files_info.length <= 4)
    return (
      <>
        <div className="grid grid-cols-2 p-2 gap-0.5 ">
          {message.files_info.map((url) => (
            <img
              key={url}
              src={import.meta.env.VITE_API_BASE_URL + url}
              className="rounded-md h-40 object-cover w-full"
            />
          ))}
        </div>
      </>
    );

  return (
    <>
      {
        <img
          src={import.meta.env.VITE_API_BASE_URL + message.files_info[0]}
          className="rounded-md h-40 object-cover w-full "
        />
      }
    </>
  );
}

export default Chat;
