import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import RegisterUserForm from '../components/seeker/RegisterUserForm';

export default function Register() {
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
            <RegisterUserForm />
        </div>
    )
}
