import React, { useState, createContext } from 'react';
import styles from './Login.module.css';
import { getImageUrl } from '../../utils';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Validation from './LoginValidation.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgotPass from './ForgotPass.jsx';

export const RecoveryContext = createContext();

function Login() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState(null);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (name === 'email') setEmail(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/');
                    } else {
                        alert("No Record Found.");
                    }
                })
                .catch(error => {
                    console.error("There was an error logging in:", error);
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        }
    };

    const navigateToOtp = () => {
        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            setOTP(OTP);

            axios
                .post("http://localhost:8081/send_recovery_email", {
                    OTP,
                    recipient_email: email,
                })
                .then(() => setPage("forgot-password"))
                .catch(console.log);
            return;
        }
        return alert("Please enter your email");
    };

    return (
        <RecoveryContext.Provider value={{ page, setPage, otp, setOTP, email, setEmail }}>
            <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles.customClass}`}>
                {page === "login" && (
                    <div className={`row border rounded-5 p-3 bg-white shadow ${styles.boxArea}`}>
                        <div className={`col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column ${styles.leftBox}`} style={{ background: '#79add8' }}>
                            <div className={`mb-3 ${styles.featuredImage}`}>
                                <img src={getImageUrl("login/cover.png")} className='img-fluid' alt="Cover"></img>
                            </div>
                            <p className={`text-white fs-5 ${styles.paraClass}`} style={{ fontWeight: 600 }}>Your Journey Starts Here</p>
                        </div>
                        <form action="" onSubmit={handleSubmit} className={`col-md-6 ${styles.rightBox}`}>
                            <div className={`align-item-center ${styles.row}`}>
                                <div className='header-text mb-4'>
                                    <h3>Welcome Back</h3>
                                </div>
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                                <div className={`input-group mb-3`}>
                                    <input
                                        type="email"
                                        className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                        placeholder="Email address" onChange={handleInput} name='email'
                                    ></input>
                                </div>
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                                <div className={`input-group mb-1`}>
                                    <input
                                        type="password"
                                        className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                        placeholder="Password" onChange={handleInput} name='password'
                                    ></input>
                                </div>
                                <div className={`input-group mb-5 d-flex justify-content-between`}>
                                    <div></div>
                                    <div className={styles.forgot}>
                                        <small><a href="#forgot-password"
                                            onClick={navigateToOtp}>Forgot Password?</a></small>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary w-100 fs-6"
                                        disabled={isSubmitting && Object.keys(errors).length === 0}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Login'}
                                    </button>
                                </div>
                                <div className="row">
                                    <small>
                                        Don't have an account? <a href="/signup">Sign Up</a>
                                    </small>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                {page === "forgot-password" && <ForgotPass />}
            </div>
        </RecoveryContext.Provider>
    );
}

export default Login;
