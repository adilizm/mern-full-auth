import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { EmitMessageWithFiles } from "../redux/slices/conversationSlice";
import Emoji_svg from "./svgs/Emoji_svg";
import EmojiPicker from "emoji-picker-react";

function ImageFilePreview({ images ,files,onClose,messageContent }) {
  const [selectedImage, setSelectedImage] = useState(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const caption = useRef()
  const dispatch = useDispatch();
  
  useEffect(()=>{
    caption.current.value = messageContent
  },[])

  const EmmitFiles = ()=>{
    dispatch(EmitMessageWithFiles({
      files,
      caption:caption.current.value
    }));
    onClose();
  }

  const handleEmoji = (emojiData) => {
    if (caption.current) {
      caption.current.value += emojiData.emoji;
    }
  };

  return (
    <div className=" w-full absolute z-100 top-0 right-0 left-0 bottom-0  bg-gray-200 flex flex-col">
      <div className="w-full bg-amber-100 p-4">Filter + options (ghanzidhom b )</div>
      <div className="  flex items-center justify-center grow ">
        <img className=" max-h-[500px]" src={images[selectedImage]} alt="" />
      </div>
      <div className="p-2 flex gap-2">
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Emoji_svg />
        </button>
        <div className=" absolute bottom-30 right-0 left-0 ">
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
        <input
          id=""
          placeholder="add a caption"
          ref={caption}
          className="bg-white m-0 w-full border  border-gray-200 p-2 rounded-lg outline-0"
        />
        <button
           onClick={EmmitFiles}
          className="bg-white border border-gray-200 p-2 rounded-full outline-0  my-auto h-10 w-10 flex items-center justify-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="w-6 h-6"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M507.607 4.395a14.992 14.992 0 0 0-16.177-3.32l-482 192.798a15 15 0 0 0-.976 27.423l190.067 92.182 92.182 190.068a14.998 14.998 0 0 0 27.423-.975L510.928 20.573a15.002 15.002 0 0 0-3.321-16.178z"
                fill="#4DBBEB"
              ></path>
              <path
                d="M507.607 4.395 198.522 313.477l92.182 190.068a14.998 14.998 0 0 0 27.423-.975L510.928 20.573a15.002 15.002 0 0 0-3.321-16.178z"
                fill="#2488FF"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="flex mb-3 items-center justify-center p-2 gap-2">
        {images.map((img, index) => {
          return (
            <img
              key={index}
              className={
                selectedImage == index
                  ? "w-10 h-10 border-orange-500 border-3 object-cover"
                  : "w-10 h-10 rounded-md object-cover"
              }
              src={img}
              alt=""
              onClick={() => {
                setSelectedImage(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageFilePreview;
