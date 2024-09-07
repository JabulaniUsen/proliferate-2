import React, { useState } from "react";
import Message from "../../components/Message";
import { useWebsocket } from "../../context/WebsocketContext";

const Messaging = () => {
  const { messages, sendMessage } = useWebsocket();
  const [input, setInput] = useState("");

  console.log(messages);
  const handleSend = () => {
    if (input.trim()) {
      sendMessage(1, 2, input); // Assuming senderId is 1, receiverId comes from props or state
      setInput("");
    }
  };

  return (
    <div>
      <div className="heading">
        <h1>Message Tutor</h1>
      </div>

      <div className="px-[30px] 2xl:px-[82px] py-[40px] flex gap-[20px] h-[85vh]">
        <div className="chat-cont w-fit h-full pr-[10px] overflow-y-auto flex flex-col gap-[20px]">
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
          <ChatProfile />
        </div>

        <div className="flex-1 h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-[600] font-Poppins">Bamidele John</p>
            <div className="bg-[red] size-[40px] rounded-full overflow-hidden"></div>
          </div>

          <div>
            <div className="mb-[20px] flex flex-col gap-[10px]">
              <Message isReceived={true} />
              <Message isReceived={false} />
              <Message isReceived={true} />
              <Message isReceived={false} />
              <Message isReceived={true} />
              <Message isReceived={false} />
              <Message isReceived={true} />
              <Message isReceived={false} />
            </div>

            <div className="w-full h-[51px] flex gap-[10px] bg-[#D9D9D9] pl-[20px]">
              <input
                className="flex-1 bg-transparent"
                placeholder="Type a message"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="block mt-auto h-full w-[100px] bg-blue text-white text-[20px] font-medium font-Poppins"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;

const ChatProfile = () => {
  return (
    <div className="flex items-center gap-[10px] cursor-pointer">
      <div className="bg-[red] size-[40px] rounded-full overflow-hidden"></div>
      <div className="font-medium font-Poppins">
        <p className="text-[20px]">Bamidele John</p>
        <p className="text-[10px]">
          Lorem ipsum dolor sit amet cosmopolitan...
        </p>
      </div>
    </div>
  );
};
