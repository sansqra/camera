// "use client";

// import { useContext, useState, useRef, useEffect } from "react";
// import useRecorder from "@/hooks/useRecorder";

// const Page = () => {
//   const [streamData, setStreamData] = useState<MediaStream | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const { startRecording, stopRecording, mediaBlobUrl } = useRecorder();
//   const [recordState, setRecordState] = useState<boolean>(false);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({
//         audio: true,
//         video: true,
//       })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           setStreamData(stream);
//         }
//       })
//       .catch((error) => {
//         console.error("Error accessing the microphone + camera:", error);
//       });

//     return () => {
//       if (streamData) {
//         const tracks = streamData.getTracks();
//         tracks.forEach((track) => {
//           track.stop();
//         });
//       }
//     };
//   }, []);

//   return <></>
// };

// export default Page;


'use client';

import VideoQ from "./components/VideoQ";


const Page = () => {
    return (
        <div>
            <VideoQ />
        </div>
    );
}

export default Page;