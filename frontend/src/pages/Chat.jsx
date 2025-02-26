import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Conversations from "../components/Conversations";
import ChatContent from "../components/ChatContent";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, update_online_users } from "../redux/slices/socketsSlice";
import SearchContact from "../components/SearchContact";
import { createNewConversation, MessageDelivered, MessageSeen, PushMessage } from "../redux/slices/conversationSlice";

function Chat() {
  const dispatch = useDispatch();
  const [is_open_searching, setIs_open_searching] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useSelector((state) => state.sockets.socket);
  const _id = useSelector((state) => state.users.user._id);
  const toggle_searching = () => {
    setIs_open_searching(!is_open_searching);
  };
  useEffect(() => {
    dispatch(connectSocket())
      .unwrap()
      .then((s) => {
        s.emit("userConnected", _id);

        s.on("updateOnlineUsers", (users) => {
          dispatch(update_online_users(users));
        });

        s.on("new_message", (data) => {
          dispatch(createNewConversation(data));
        });

        s.on("message", (data) => {
          dispatch(PushMessage(data));
          if(_id != data.msg.from){
            s.emit('message_delivred',data.msg)
            console.log('message_delivred fired')
          }
        });

        s.on("message_delivred", (data) => {
          dispatch(MessageDelivered(data));
        });

        s.on("message_is_seen", (data) => {
          dispatch(MessageSeen(data));
        });


      })
      .catch((err) => console.error("Logout error:", err));
  }, []);

  useEffect(() => {
    if (socket) {
      return () => socket.disconnect();
    }
  }, []);

  return (
    <>
      <Header />
      {onlineUsers}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-1.5 px-2 md:min-h-[75vh]">
        {is_open_searching ? (
          <SearchContact
            is_open={is_open_searching}
            ontoggle_searching={toggle_searching}
          />
        ) : (
          <Conversations ontoggle_searching={toggle_searching} />
        )}

        <ChatContent />
      </div>
    </>
  );
}

export default Chat;
