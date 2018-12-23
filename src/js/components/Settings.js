import React from 'react';

const Settings = (props) => (
  <div id="settings">
    <h5>Settings</h5>
    <div>
      Work Length:  <input className="number" type="number" min="1" value={props.workLength} onChange={(e) => props.onChange("workLength", e)}/> minutes 
      <br/>
      Break Length: <input className="number" type="number" min="1" value={props.breakLength} onChange={(e) => props.onChange("breakLength", e)}/> minutes
      <br/>
      <div className="form-check">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox" onChange={(e) => props.onCheck("auto", e)} defaultChecked/> Automatically start sessions
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox" onChange={(e) => props.onCheck("mute", e)}/> Mute alarm
        </label>
      </div>
    </div>
  </div>
);

export default Settings;