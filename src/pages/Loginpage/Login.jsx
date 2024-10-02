import React from 'react';
import styles from './Login.module.css';
import { getImageUrl } from '../../utils';
function Login() {
    return (
        <>
            <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles.customClass}`}>
                <div className={`row border rounded-5 p-3 bg-white shadow ${styles.boxArea}`}>
                    <div className={`col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column ${styles.leftBox}`} style={{ background: '#79add8' }}>
                        <div className={`mb-3 ${styles.featuredImage}`}>
                            <img src={getImageUrl("login/cover.png")} className='img-fluid'></img>
                        </div>
                        <p className={`text-white fs-5 ${styles.paraClass}`} style={{ fontWeight: 600 }}>Your Journey Starts Here</p>
                    </div>
                    <div className={`col-md-6 ${styles.rightBox}`}>
                        <div className={`align-item-center ${styles.row}`}>
                            <div className='header-text mb-4'>
                                <h3>Welcome Back</h3>
                            </div>
                            <div className={`input-group mb-3`}>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                    placeholder="Email address"
                                ></input>
                            </div>
                            <div className={`input-group mb-1`}>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                    placeholder="Password"
                                ></input>
                            </div>
                            <div className={`input-group mb-5 d-flex justify-content-between`}>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="formCheck"
                                    />
                                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                                        <small>Remember Me</small>
                                    </label>
                                </div>
                                <div className={styles.forgot}>
                                    <small><a href="#">Forgot Password?</a></small>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-light w-100 fs-6">
                                    <img
                                        src={getImageUrl("login/google.png")}
                                        alt="Google Logo"
                                        style={{ width: '20px' }}
                                        className="me-2"
                                    />
                                    <small>Sign In with Google</small>
                                </button>
                            </div>
                            <div className="row">
                                <small>
                                    Don't have an account? <a href="#">Sign Up</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login
