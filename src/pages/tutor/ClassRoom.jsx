import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { v4 } from 'uuid'
// import {  v4 } from uuid

function ClassRoom() {

    const{classId} = useParams()

    async function classUi(element) {
        const appId = 810156460
        const ServerSecret = '4f0f7450e6345ea6282717edc885869f'
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId, ServerSecret, classId, v4(), 'Enter your name here...'
        )

        const ui = ZegoUIKitPrebuilt.create(kitToken)

        ui.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            }
        })
    }
  return (
    <div>
      <h2 className='text-2xl text-black'>Class {classId}</h2>
      <div 
        className="flex items-center justify-center h-full"
        ref={classUi}
        ></div>
    </div>
  )
}

export default ClassRoom
