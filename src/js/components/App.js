import React, { Component } from 'react';
import Clock from './Clock';
import Settings from './Settings';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.timer = null; //field used to store the time interval set up when Start is clicked
    this.state = {
      workLength: 25, //in minutes
      breakLength: 5, //in minutes
      currentTime: 0, //in seconds
      sessionEndTime: 1500, //in seconds
      currentSession: "Work",
      sessionActive: false,
      autoStartSessions: true,
      muteAudio: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  
  //method to update the workLength and breakLength
  handleChange(propName, event) {
    this.setState({[propName]: event.target.value});
    this.reset();
    if ((this.state.currentSession == "Work"  && propName == "workLength") ||
        (this.state.currentSession == "Break" && propName == "breakLength")) {
      this.setState({sessionEndTime: 60*event.target.value});
    }
  }
  
  handleClick(button) {
    if (button == "Start") {
      this.setState({sessionActive: true});
      this.timer = setInterval(() => this.tick(), 1000);
    }
    else if (button == "Pause") {
      this.setState({sessionActive: false});
      clearInterval(this.timer);
    }
    else if (button == "Reset") {
      this.reset();
    }
  }
  
  //method to handle checkbox settings
  handleCheck(setting) {
    let newSetting;
    if (setting == "auto") {
      newSetting = !this.state.autoStartSessions;
      this.setState({autoStartSessions: newSetting});
    }
    else if (setting == "mute") {
      newSetting = !this.state.muteAudio;
      this.setState({muteAudio: newSetting});
    }
  }
  
  //method to update state every second (only when there is an active session)
  tick() {
    if (this.state.currentTime < this.state.sessionEndTime) {
      this.setState(prevState => ({currentTime: prevState.currentTime + 1}));
    }
    //when time runs out in a session
    else {
      let nextSession, nextSessionEndTime;
      if (this.state.currentSession == "Work") {
        nextSession = "Break";
        nextSessionEndTime = 60*this.state.breakLength;
      }
      else {
        nextSession = "Work";
        nextSessionEndTime = 60*this.state.workLength;
      }
      this.setState({
        currentTime: 0,
        currentSession: nextSession,
        sessionEndTime: nextSessionEndTime
      });
      
      //play alarm sound if audio is not muted
      if (!this.state.muteAudio) {
        let audio = document.getElementById("audio");
        audio.load();
        audio.play();
        setTimeout(() => audio.pause(), 1000);
      }
      
      //clear the timer if autoStartSessions is false
      if (!this.state.autoStartSessions) {
        this.reset();
      }
    }
  }
  
  //method to reset the clock (invoked when Reset is clicked or when settings are changed)
  reset() {
    this.setState({
      sessionActive: false,
      currentTime : 0
    });
    clearInterval(this.timer);
  }
  
  render() {
    return (
      <div>
        <h1> Pomodoro Clock </h1>
        <Clock 
          currentSession={this.state.currentSession} 
          currentTime={this.state.currentTime}
          sessionEndTime={this.state.sessionEndTime}
          sessionActive={this.state.sessionActive}
          onClick={this.handleClick}
        />
        <Settings 
          workLength={this.state.workLength} 
          breakLength={this.state.breakLength}
          onChange={this.handleChange}
          onCheck={this.handleCheck}
        />

      </div>
    );
  }
}