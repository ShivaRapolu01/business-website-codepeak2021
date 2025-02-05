import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState(false);
    const [user, setUser] = useState({ email: '', password: '' })
    const handleLoginInput = e => setUser({ ...user, [e.target.name]: e.target.value });
    const userLogin = async () => {
        const res = await fetch('/user/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            navigate('/');
        } else {
            window.alert(data.error);
        }
    }
    const checkLoggedUser = async () => {
        const res = await fetch('/user/check');
        if (res.status === 200) {
            setLoggedUser(false);
        } else {
            setLoggedUser(true);
        }
    }
    useEffect(() => {
        checkLoggedUser();
    }, [])

    if (loggedUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <div className="form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div>
                    <div className="form-fields">
                        <input name="email" type="text" className="form-control" id="email" placeholder="E-mail"
                            value={user.email} onChange={handleLoginInput} />
                    </div>
                    <div className="form-fields">
                        <input name="password" type="password" className="form-control" id="password"
                            placeholder="Password" value={user.password} onChange={handleLoginInput} />
                    </div>
                    <button onClick={userLogin} className="btn-account">Submit</button>
                </div>
                <div className="account-toggle">
                    <p>No account?</p><Link to="/user/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
