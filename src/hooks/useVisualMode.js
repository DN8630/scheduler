import { useState } from 'react';


function useVisualMode(initialMode) {
const[mode, setMode] = useState(initialMode);
const[history, setHistory] = useState([initialMode]);

function transition(mode,replace = false) { 
  if (replace) {
    if (history.length > 1) {
      setHistory([...history.slice(0,history.length - 1),mode]);
    }
  }
  else {
    setHistory([...history,mode]);
  }
  setMode(mode);
  
}

function back() {
  if (history.length > 1) {
    const newHistory = history.slice(0, history.length -1);
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }
}



return { mode, history, transition, back };
}

export default useVisualMode;