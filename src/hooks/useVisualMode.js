import { useState } from 'react';


// state driven tracker of currently required component for any given workflow (i.e. creating, editing or deleting
// an appointment)

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace === true) {
      setMode(newMode);
      let newHistory = [...history];
      newHistory[newHistory.length - 1] = newMode;
      setHistory(newHistory);
    } else {
      setMode(newMode);
      let newHistory = [...history];
      newHistory.push(newMode)
      setHistory(newHistory);
    }
  }

  const back = function () {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      let newHistory = [...history];
      newHistory.pop()
      setHistory(newHistory);
    }
  }
  return {
    mode,
    transition,
    back
  };
}

