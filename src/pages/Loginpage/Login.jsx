import React, { useState } from 'react';
import styles from './Login.module.css';
import { getImageUrl } from '../../utils';
import Navbar from '../../components/Navbar/Navbar.jsx'
import Validation from './LoginValidation.jsx'
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }
    return (
        <>
            <Navbar />
            <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles.customClass}`}>
                <div className={`row border rounded-5 p-3 bg-white shadow ${styles.boxArea}`}>
                    <div className={`col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column ${styles.leftBox}`} style={{ background: '#79add8' }}>
                        <div className={`mb-3 ${styles.featuredImage}`}>
                            <img src={getImageUrl("login/cover.png")} className='img-fluid'></img>
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
                                <button type='submit' className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                            </div>
                            <div className="row">
                                <small>
                                    Don't have an account? <a href="/signup">Sign Up</a>
                                </small>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Login
