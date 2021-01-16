import React, { Component, useState, useEffect, useCallback } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';



function RegisterModal( props /*{error, clearErrors, registerUser, isAuthenticated}*/ ) {
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordCheck: '',
        firstName: '',
        lastName: '',
        //dateOfBirth: TODO (visual date picker)
        //location: TODO (dropdown?)
    }); 
    const [modalState, setModalState] = useState( false );
    const [msg, setMsg] = useState( null );

    
    const toggle = () => {
        props.clearErrors();
        setModalState(!modalState);
    }

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, passwordCheck } = state;

        // Create user object
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            passwordCheck
        };

        // Attempt to register
        props.registerUser(newUser);

    }

    useEffect(() => {
        if(props.error.id === 'REGISTER_FAIL') {
            setMsg(props.error.msg.msg);
        } else {
            setMsg(null);
        }
    }, [props.error])

    // Close modal if authenticated
    useEffect(() => {
        if(props.isAuthenticated) {
            if(modalState) {
                setModalState(false);
            }
        }
    }, [props.isAuthenticated, modalState])

    return (
        <div>
            <NavLink onClick={toggle} href='#'>
                Register
            </NavLink>

            <Modal isOpen={modalState} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color="danger">{msg}</Alert> : null }
                    <form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label htmlFor='firstName'>First Name</Label>
                            <Input
                                type='text'
                                name='firstName'
                                id='firstName'
                                placeholder='First Name'
                                className='mb-3'
                                onChange={onChange}
                            />
                            <Label htmlFor='lastName'>Last Name</Label>
                            <Input
                                type='text'
                                name='lastName'
                                id='lastName'
                                placeholder='Last Name'
                                className='mb-3'
                                onChange={onChange}
                            />
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Email'
                                className='mb-3'
                                onChange={onChange}
                            />
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                className='mb-3'
                                onChange={onChange}
                            />
                            <Label htmlFor='passwordCheck'>Password</Label>
                            <Input
                                type='password'
                                name='passwordCheck'
                                id='passwordCheck'
                                placeholder='Verify Password'
                                className='mb-3'
                                onChange={onChange}
                            />
                            <Button color='dark' style={{ marginTop: '2rem' }} block>
                                Register
                            </Button>
                        </FormGroup>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    // Getting this from reducers/index.js
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { registerUser, clearErrors }
)(RegisterModal);
