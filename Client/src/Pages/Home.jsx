import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { user } from '../Slices/authSlice';
import styles from '../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
            navigate('/stocks');
        }
    }, []);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleRegisterChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // Simulating backend response
        fetch('http://localhost:5000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(user(data));
                localStorage.setItem('auth', JSON.stringify(data));
                navigate('/buy')
            });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // Simulating backend response
        fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                dispatch(user(data));
                localStorage.setItem('auth', JSON.stringify(data));
            }
            );
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.heading}>Register</h1>
                <form onSubmit={handleRegisterSubmit} className={styles.form}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Name"
                        value={registerForm.username}
                        onChange={handleRegisterChange}
                        className={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Register</button>
                </form>
            </div>
            <div className={styles.formContainer}>
                <h1 className={styles.heading}>Login</h1>
                <form onSubmit={handleLoginSubmit} className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};
export default Home;
