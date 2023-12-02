import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Timer() {
  const [activeTimer, setActiveTimer] = useState("");
  const [lastCompletedTimer, setLastCompletedTimer] = useState(null);
  const audio = new Audio("./MediaSrc/clockAlarm.mp3");
  const [time, setTime] = useState(getInitialTime(""));
  const [sessionCount, setSessionCount] = useState(0);
  const [start, setStart] = useState(false);
  const [counterCycle, setCounterCycle] = useState(0);
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    handleTimerClick("pomodoro", "pomodoro");
  }, []);

  const handleTimerClick = (timerType, init) => {
    setTime(getInitialTime(init));
    setActiveTimer(timerType);

    // Check auto start settings
    if (
      (timerType === "pomodoro" && settings.autoStartPomodoro) ||
      (timerType === "shortBreak" && settings.autoStartShortBreak)
    ) {
      setStart(true);
    } else {
      setStart(false);
    }
  };

  document.title = "Time : " + formatTime(time);

  useEffect(() => {
    let intervalId;

    if (time > 0 && start) {
      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    if (time === 3 && start) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    if (time === 0) {
      setStart(false);
      switchToNextTimer();
      incrementSessionCount();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [time, start, activeTimer, settings]);

  useEffect(() => {
    if (lastCompletedTimer === "pomodoro" && activeTimer === "shortBreak") {
      incrementCounterCycle();
    }
  }, [lastCompletedTimer, activeTimer]);

  const switchToNextTimer = () => {
    setLastCompletedTimer(activeTimer);

    switch (activeTimer) {
      case "pomodoro":
        setActiveTimer("shortBreak");
        setTime(getInitialTime("shortBreak"));
        break;
      case "shortBreak":
        setActiveTimer("pomodoro");
        setTime(getInitialTime("pomodoro"));
        break;
      case "longBreak":
        setActiveTimer("pomodoro");
        setTime(getInitialTime("pomodoro"));
        resetSessionCount();
        break;
      default:
        break;
    }
  };

  const incrementSessionCount = () => {
    setSessionCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= 6) {
        setActiveTimer("longBreak");
        setTime(getInitialTime("longBreak"));
        resetSessionCount();
        incrementCounterCycle();
      }
      return newCount;
    });
  };

  const resetSessionCount = () => {
    setSessionCount(0);
  };

  const incrementCounterCycle = () => {
    setCounterCycle((prevCounterCycle) => prevCounterCycle + 1);
  };

  return (
    <div>
      <center>
        <div className="pomodoroRec">
          <div className="listOptions">
            <button
              onClick={() => handleTimerClick("pomodoro", "pomodoro")}
              className="btnOption"
              title="Switch to Pomodoro"
            >
              Pomodoro
            </button>
            <button
              onClick={() => handleTimerClick("shortBreak", "shortBreak")}
              className="btnOption"
              title="Switch to Short Break"
            >
              Short Break
            </button>
            <button
              onClick={() => handleTimerClick("longBreak", "longBreak")}
              className="btnOption"
              title="Switch to Long Break"
            >
              Long Break
            </button>
          </div>
          <br />
          {activeTimer === "pomodoro" && <TimerCalculator type="pomodoro" />}
          {activeTimer === "shortBreak" && (
            <TimerCalculator type="shortBreak" />
          )}
          {activeTimer === "longBreak" && <TimerCalculator type="longBreak" />}
        </div>
      </center>
    </div>
  );

  function TimerCalculator({ type }) {
    useEffect(() => {
      let intervalId;

      if (time === 3 && start) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }

      return () => {
        clearInterval(intervalId);
      };
    }, [time, start, type]);

    const handleStart = () => {
      if (!start) {
        setStart(true);
      }
      audio.pause();
    };

    const handleStop = () => {
      if (start) {
        setStart(false);
      }
      audio.pause();
    };

    const handleReset = () => {
      setStart(false);
      setTime(getInitialTime(type));
      audio.pause();
    };

    return (
      <div>
        <h6 className="type"> - {type} - </h6>
        <h1 className="timer">{formatTime(time)}</h1>
        <div className="listbtnContrles">
          <button onClick={handleStop} title="Stop" className="stop">
            <i className="bx bxs-hand"></i>
          </button>
          <button onClick={handleStart} title="Start" className="start">
            Start
          </button>
          <button onClick={handleReset} title="Reset" className="reset">
            <i className="bx bx-reset"></i>
          </button>
        </div>
        <br />
        <h4 className="fois"># {counterCycle}</h4>
      </div>
    );
  }

  function getInitialTime(type = "pomodoro") {
    switch (type) {
      case "pomodoro":
        return settings.pomodoro * 60;
      case "shortBreak":
        return settings.shortBreak * 60;
      case "longBreak":
        return settings.longBreak * 60;
      default:
        return 0;
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }
}
