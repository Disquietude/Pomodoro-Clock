import React from 'react';

const convertTime = (time) => {
  let seconds = time % 60;
  let minutes = (time-seconds)/60;
  seconds = seconds.toString();
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

const Clock = (props) => {
  let firstButton, completionPercent;
  //logic to allow first button to switch between Start and Pause
  if (!props.sessionActive) {
    firstButton = "Start";
  } else {
    firstButton = "Pause";
  }
  //logic to set length of progress bar
  completionPercent = 100*(props.currentTime/props.sessionEndTime) + "%";

  return (
    <div id="clock">
      <h3> {props.currentSession} </h3>
      <div style={{height: 10, border: "solid"}}>
        <div style={{
            background:"black",
            height: 5,
            width: completionPercent,
            transition: "width 1s linear"
          }}></div>
      </div>
      <div>
        {convertTime(props.currentTime)} / {convertTime(props.sessionEndTime)}
      </div>
      <div>
        <button onClick={(e) => props.onClick(firstButton, e)} className="btn"> {firstButton} </button>
        <button onClick={(e) => props.onClick("Reset", e)} className="btn"> Reset </button>
      </div>
    </div>
  );
}

export default Clock;