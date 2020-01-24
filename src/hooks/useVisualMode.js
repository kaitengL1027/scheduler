import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    if (replace) {
      setMode(newMode);
      setHistory([...history.slice(0, -1), newMode]);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)]);
      setMode(history.slice(-1)[0]);
    }
  }


  return { mode, transition, back };
};