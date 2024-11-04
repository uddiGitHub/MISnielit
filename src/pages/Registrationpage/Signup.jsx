import React, { useState } from 'react';
import styles from '../Loginpage/Login.module.css';
import { getImageUrl } from '../../utils';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Validation from './SignupValidation.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        stud_name: '',
        roll_no: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    console.log(res);
                    setIsSubmitting(false);
                    navigate('/login');
                })
                .catch(err => {
                    setIsSubmitting(false);
                    if (err.response && err.response.status === 400) {
                        alert(err.response.data);
                    } else {
                        alert("An error occurred during signup. Please try again.");
                    }
                });
        }
    };

    return (
        <>
            <Navbar />
            <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles.customClass}`}>
                <div className={`row border rounded-5 p-3 bg-white shadow ${styles.boxArea}`}>
                    <form action="" onSubmit={handleSubmit} className={`col-md-6 ${styles.rightBox}`}>
                        <div className={`align-item-center ${styles.row}`}>
                            <div className='header-text mb-4'>
                                <h3>Create an Account</h3>
                            </div>
                            {errors.stud_name && <span className='text-danger'>{errors.stud_name}</span>}
                            <div className={`input-group mb-3`}>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                    placeholder="Name" onChange={handleInput} name='stud_name'
                                />
                            </div>
                            {errors.roll_no && <span className='text-danger'>{errors.roll_no}</span>}
                            <div className={`input-group mb-3`}>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                    placeholder="Roll Number" onChange={handleInput} name='roll_no'
                                />
                            </div>
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                            <div className={`input-group mb-3`}>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                    placeholder="Email address" onChange={handleInput} name='email'
                                />
                            </div>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                            <div className={`input-group mb-1`}>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg bg-light fs-6 ${styles.inputField}`}
                                    placeholder="Create password" onChange={handleInput} name='password'
                                />
                            </div>
                            <div className="input-group mb-3">
                                <button type='submit' className="btn btn-lg btn-primary w-100 fs-6 mt-5" disabled={isSubmitting}>
                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </div>
                            <div className="row">
                                <small>
                                    Already have an account? <a href="/login">Log In</a>
                                </small>
                            </div>
                        </div>
                    </form>
                    <div className={`col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column ${styles.leftBox}`} style={{ background: '#79add8' }}>
                        <div className={`mb-3 ${styles.featuredImage}`}>
                            <img src={getImageUrl("login/cover.png")} className='img-fluid' alt="Signup Cover" />
                        </div>
                        <p className={`text-white fs-5 ${styles.paraClass}`} style={{ fontWeight: 600 }}>Your Journey Starts Here</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
