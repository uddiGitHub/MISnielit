import React from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from 'axios';
import { RecoveryContext } from "./Login";

function ForgotPass() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:8081/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className={`d-flex justify-content-center align-items-center min-vh-100 bg-light`}>
      <div className={`row border rounded-5 p-4 bg-white shadow-lg w-100 max-w-lg`}>
        <div className={`col-12 text-center mb-4`}>
          <h1 className={`fw-bold text-dark`}>Email Verification</h1>
          <p className={`text-muted mt-2`}>
            We have sent a code to your email <span className={`fw-semibold`}>{email}</span>
          </p>
        </div>

        <form className={`col-12`}>
          <div className={`d-flex justify-content-center gap-3 mb-4`}>
            {Array.from({ length: 4 }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className={`form-control text-center fw-semibold fs-5 border rounded-3`}
                style={{ width: "60px", height: "60px" }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]$/.test(value)) { 
                    const newOTP = [...OTPinput];
                    newOTP[index] = value;
                    setOTPinput(newOTP);
                    if (index < 3) {
                      document.getElementById(`otp-input-${index + 1}`).focus();
                    }
                  }
                }}
                id={`otp-input-${index}`} 
              />
            ))}
          </div>

          <div className={`d-flex justify-content-center flex-column align-items-center`}>
            <button
              type="button"
              onClick={verfiyOTP}
              className={`btn btn-primary w-50 py-2 mb-3`}
            >
              Verify Account
            </button>

            <div className={`d-flex justify-content-center align-items-center text-muted`}>
              <p className={`mb-0 me-2`}>Didn't receive the code?</p>
              <button
                type="button"
                className={`btn btn-link p-0 text-primary fw-semibold ${disable ? "disabled" : ""}`}
                disabled={disable}
                onClick={() => !disable && resendOTP()}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>




  );
}
export default ForgotPass