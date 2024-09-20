"use client";

import { Suspense, useState, useRef, useEffect } from "react";

const VideoQ = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isMediaInUse, setIsMediaInUse] = useState<boolean>(false);
  const [streamData, setStreamData] = useState<MediaStream | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDone, setRecordingDone] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        setIsMediaInUse(true);

        if (videoPlayerRef.current) {
          videoPlayerRef.current.srcObject = stream;
          setStreamData(stream);
        }

        const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

        recorder.ondataavailable = (e) => {
          setMediaBlobUrl(window.URL.createObjectURL(e.data));
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing the microphone + camera:", error);
      });
  };

  const dataURLtoBlob = (dataURL: string) => {
    const parts = dataURL.split(",");
    const mime = parts[0].match(/:(.*?);/);
    if (!mime) return null;
    const mimeType = mime[1];
    const b64Data = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(b64Data.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < b64Data.length; i++) {
      view[i] = b64Data.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeType });
  };

  const downloadVideo = () => {
    if (mediaBlobUrl) {
      const blob = dataURLtoBlob(mediaBlobUrl);

      const url = mediaBlobUrl;

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "video.webm"; // Specify the desired file name here
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url); // Clean up
      document.body.removeChild(a);
    }
  };

  const uploadVideo = () => {};

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordingDone(true);
      setIsMediaInUse(false);
    }
    if (videoPlayerRef.current) {
      videoPlayerRef.current.srcObject = null;
    }
    downloadVideo();

    console.log("here we upload the file");
  };

  useEffect(() => {
    startRecording();

    return () => {
      if (!recordingDone && streamData) {
        stopRecording();

        const tracks = streamData.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoPlayerRef} autoPlay playsInline muted />
      {isMediaInUse && isRecording ? (
        <h3>Recording in progress</h3>
      ) : (
        <h3>Please refresh the page or provide media access</h3>
      )}
      {recordingDone ? null : <button onClick={stopRecording}>Proceed</button>}
    </div>
  );
};

export default VideoQ;
