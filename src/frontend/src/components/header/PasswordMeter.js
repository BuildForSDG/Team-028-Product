import React, { Component } from 'react';
import "../../styles/passwordMeter.css";
import zxcvbn from 'zxcvbn';

export class PasswordMeter extends Component {
  createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }  

  render() {
    const { password } = this.props;
    const tested = zxcvbn(password);

    return (
      <div className="password-strength-meter">
        <progress className={`password-strength-meter-progress strength-${this.createPasswordLabel(tested)}`}
        value={tested.score}
        max="4"/>

           <br />

        <label
          classresult  
          resultName="password-strength-meter-label">
        {password && (<strong>Password Strength:</strong> ,this.createPasswordLabel(tested))}      
          </label>
      </div>
    )
  }
}

export default PasswordMeter;
