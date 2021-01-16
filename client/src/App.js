import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions/userActions';
import { loadUser } from './actions/authActions';

import RegisterModal from './components/auth/RegisterModal';


const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users); // Select required part of the store

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <>
            <RegisterModal />
            {users.map((user) => {
                return (
                    <div key={user._id}>
                        <hr/>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <h2>{user.userType}</h2>
                        <h2>{user.profession}</h2>
                        <hr/>
                    </div>
                )
            })}
        </>
    )
}

export default App;