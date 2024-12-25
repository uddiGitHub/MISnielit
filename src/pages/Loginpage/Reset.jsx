import React, { useContext } from 'react'
import { RecoveryContext } from "./Login";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reset() {
  const navigate = useNavigate();
  const { email, otp, setPage } = useContext(RecoveryContext);
  async function changePassword() {
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value; 

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!newPassword || !confirmPassword) {
      alert("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    if (!passwordPattern.test(newPassword)) {
      alert("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/reset_password", {
        email,
        newPassword
      });

      if (response.status === 200) {
        alert("Password updated successfully.");
        navigate("/login");
        window.location.reload();
        
      } else {
        alert(response.data.error || "An error occurred.");
      }
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred.");
    }
  }

  return (
    <div className={`d-flex justify-content-center align-items-center min-vh-100`}>
      <div className={`row border rounded-5 p-4 bg-white shadow-lg w-100 max-w-lg`}>
        <div className={`col-12 text-center mb-4`}>
          <h1 className={`fw-bold text-dark`}>Change Password</h1>
        </div>

        <form className={`col-12`}>
          <div className={`mb-4`}>
            <label htmlFor="password" className={`form-label text-muted`}>New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={`form-control border rounded-3`}
              required=""
            />
          </div>

          <div className={`mb-4`}>
            <label htmlFor="confirm-password" className={`form-label text-muted`}>Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className={`form-control border rounded-3`}
              required=""
            />
          </div>

          <div className={`d-flex justify-content-center flex-column align-items-center`}>
            <button
              type="button"
              onClick={() => changePassword()}
              className={`btn btn-primary w-50 py-2 mb-3`}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reset;
