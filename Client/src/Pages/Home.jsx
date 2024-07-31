import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { user } from './authSlice';

const Home = () => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

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
        // Here you should add logic to send registerForm data to your backend.
        // Simulating backend response
        const response = {
            _id: 'user123',
            phoneNumber: '1234567890',
            name: registerForm.name,
            role: 'user',
            gender: 'male',
            isSalon: false
        };
        dispatch(user(response));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // Here you should add logic to send loginForm data to your backend.
        // Simulating backend response
        const response = {
            _id: 'user123',
            phoneNumber: '1234567890',
            name: 'John Doe',
            role: 'user',
            gender: 'male',
            isSalon: false
        };
        dispatch(user(response));
    };

    return (
        <div>
            <div>
                <h1>Register</h1>
                <form onSubmit={handleRegisterSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={registerForm.name}
                        onChange={handleRegisterChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
