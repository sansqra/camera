"use client";

import { createContext, useState, useMemo, useEffect } from "react";

import React from "react";

export type AppContextType = {
  streamData: MediaStream | null;
  setStreamData: (streamData: MediaStream | null) => void;
};

export const AppContext = createContext<AppContextType>({
  streamData: null,
  setStreamData: () => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [streamData, setStreamData] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        alert("This was run");
        setStreamData(stream);
      })
      .catch((error) => {
        console.error("Error accessing the microphone + camera:", error);
      });
  }, [streamData]);

  const value = { streamData, setStreamData };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
