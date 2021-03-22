import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import LoginForm from '../components/auth/LoginForm';


export default function Login() {
    const history = useHistory();
    const auth = useSelector((store) => store.auth);

    // If user logged in already, go to home page
    useEffect(() => {
        if(auth.isAuthenticated) {
            history.push("/profile");
        }
    }, [auth.isAuthenticated, history])

    return (
        <div>
            <LoginForm />
        </div>
    )
}
