import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions/userActions';
import { loadUser } from './actions/authActions';


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
            {users.map((user) => (
                <div key={user.id}>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <h2>{user.userType}</h2>
                    <h2>{user.profession}</h2>
                </div>
            ))}
        </>
    )
}

export default App;