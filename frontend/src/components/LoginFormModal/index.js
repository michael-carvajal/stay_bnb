// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.sessionLogIn({ credential, password }))
            .then(closeModal).then(() => history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data && data.message) {
                    setErrors({credential: data.message});
                }
            });
    };

    const handleDemoUser = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.sessionLogIn({  credential: "demo-user", password: "password" }))
            .then(closeModal).then(() => history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data && data.message) {
                    setErrors({ credential: data.message });
                }
            });
    }
console.log("this is log in modal");
    return (
        <div className="log-in">
            <h1>Log In</h1>
            {errors.credential && (
                <span className="span-error">The provided credentials were invalid.</span>
            )}
            <form className="form-labels" onSubmit={handleSubmit}>
                <label>
                    Username or Email
                </label>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder="Username or Email"
                    />
                <label>
                    Password
                </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />

                <button className="reserve-btn login-btn" type="submit">Log In</button>
            </form>
                <p style={{color: "purple", textDecoration: "underline", cursor:"pointer"}} onClick={handleDemoUser}>Log in as Demo User</p>
        </div>
    );
}

export default LoginFormModal;
