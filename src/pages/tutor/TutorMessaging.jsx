import React, { useEffect } from 'react'
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react'
import '@zegocloud/zimkit-react/index.css'
import { useState } from 'react'
import { APP_ID, APP_SECRET } from '../../components/constants'
// import { ZIMKit } from '@zegocloud/zimkit-rn';

const id = Math.floor(Math.random()*1000)

function TutorMessaging() {
  const [state, setState] = useState(
    {
      appConfig:{
        appID: APP_ID,
        serverSecret: APP_SECRET
      },
      userInfo:{
        userID: `Tutor${id}`,
        userName: `Tutor${id}`,
        userAvatarUrl: 'data:image/jpeg;base64,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'
      },
    }
  )

  useEffect(() => {
    const init = async () => {
      const zinkit = new ZIMKitManager();
      const token = zinkit.generateKitTokenForTest(
        state.appConfig.appID, 
        state.appConfig.serverSecret,
        state.userInfo.userID  
      );
      await zinkit.init(state.appConfig.appID);
      await zinkit.connectUser(state.userInfo, token);
    };
    init()
  }, [])


  return (
    <div>
      {state.userInfo.userID}
      <Common></Common>
    </div>
  )

}

export default TutorMessaging




// import React from "react";
// import Message from "../../components/Message";

// const TutorMessaging = () => {
//   return (
//     <div>
//       <div className="heading">
//         <h1>Message Tutor</h1>
//       </div>

//       <div className="px-[30px] 2xl:px-[82px] py-[40px] flex gap-[20px] h-screen">
//         <div className="chat-cont w-fit h-full pr-[10px] overflow-y-auto flex flex-col gap-[20px]">
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//           <ChatProfile />
//         </div>

//         <div className="flex-1 h-full flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <p className="text-[20px] font-[600] font-Poppins">Bamidele John</p>
//             <div className="bg-[red] size-[40px] rounded-full overflow-hidden"></div>
//           </div>

//           <div>
//             <div className="mb-[20px] flex flex-col gap-[10px]">
//               <Message isReceived={true} />
//               <Message isReceived={false} />
//               <Message isReceived={true} />
//               <Message isReceived={false} />
//               <Message isReceived={true} />
//               <Message isReceived={false} />
//               <Message isReceived={true} />
//               <Message isReceived={false} />
//             </div>
//             <div className="w-full h-[51px] flex gap-[10px] bg-[#D9D9D9] pl-[20px]">
//               <input
//                 className="flex-1 bg-transparent"
//                 placeholder="Type a message"
//                 type="text"
//               />
//               <button className="block mt-auto h-full w-[100px] bg-blue text-white text-[20px] font-medium font-Poppins">
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TutorMessaging;

// const ChatProfile = () => {
//   return (
//     <div className="flex items-center gap-[10px] cursor-pointer">
//       <div className="bg-[red] size-[40px] rounded-full overflow-hidden"></div>
//       <div className="font-medium font-Poppins">
//         <p className="text-[20px]">Bamidele John</p>
//         <p className="text-[10px]">
//           Lorem ipsum dolor sit amet cosmopolitan...
//         </p>
//       </div>
//     </div>
//   );
// };


