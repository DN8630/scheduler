import { useState } from 'react';


function useVisualMode(initialMode) {
const[mode, setMode] = useState(initialMode);
const[history, setHistory] = useState([initialMode]);

function transition(mode,replace = false) { 
  if (replace) {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0,prev.length - 1),mode]);
    }
  }
  else {
    setHistory(prev => [...prev,mode]);
  }
  setMode(mode);
}

function back() {
  if (history.length > 1) {
    setHistory(prev => prev.slice(0, prev.length - 1));
    
    setMode(history[history.length - 2]);
  }
}

return { mode, history, transition, back };
}

export default useVisualMode;