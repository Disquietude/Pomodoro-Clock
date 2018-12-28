import React from 'react';

const Settings = (props) => (
  <div className="card settings">
    <h5>Settings</h5>
    <div>
      <div className="settings__durations">
        <span>Work Length:</span>
        <input 
          className="settings__number-input" 
          type="number" 
          min="1" 
          value={props.workLength} 
          onChange={(e) => props.onChange("workLength", e)}
        />
        <span>minutes</span> 

        <span>Break Length:</span>
        <input 
          className="settings__number-input" 
          type="number" 
          min="1" 
          value={props.breakLength} 
          onChange={(e) => props.onChange("breakLength", e)}
        />
        <span>minutes</span>

      </div>

      <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox" 
          onChange={(e) => props.onCheck("auto", e)} 
          defaultChecked
        />       
        <label className="form-check-label">Automatically start sessions</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input" 
          type="checkbox" 
          onChange={(e) => props.onCheck("mute", e)}
        /> 
        <label className="form-check-label">Mute alarm</label>
      </div>
    </div>
  </div>
);

export default Settings;