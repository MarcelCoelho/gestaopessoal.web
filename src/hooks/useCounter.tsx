import React from 'react';
import { createContext, ReactNode, useState, useEffect } from "react";

interface CounterContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCounter: () => void;
  resetCounter: () => void;
}

interface CounterProviderProps {
  children: ReactNode;
}

export const CounterContext = createContext({} as CounterContextData);

let counterTimeout: NodeJS.Timeout;

export function CounterProvider({ children }: CounterProviderProps) {

  const initialTime = 1;

  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCounter() {
    setIsActive(true);
  }

  function resetCounter() {
    clearTimeout(counterTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(initialTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      counterTimeout = setTimeout(() => {
        setTime(time + 1);
      }, 1000)
    }
    else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <CounterContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCounter,
      resetCounter
    }}>

      {children}
    </CounterContext.Provider>
  );
}