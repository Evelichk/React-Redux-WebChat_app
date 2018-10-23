'use strict';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {warner} from "../../libs/warner";


export default class RegPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            checkPass: '',
            loginValid: false,
            emailValid: false,
            passwordValid: false,
            checkPassValid: false,
            formValid: false,
            success: false
        }
    }
    handleUserInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value}, () => {
            if (name !== 'login') this.validateField(name, value)
        })
    };
    //fetching login input to the server for checking it's existence in DB when onBlur event fires
    validateLogin = (e) => {
        let loginValid = this.state.loginValid;
        if (!e.target.value) return;
        const options = {
            method: 'POST',
            cache: 'default',
            body: e.target.value
        };
        fetch('/validlogin', options)
            .then((response) => {
                switch(response.status){
                    case 200:
                        // toggle function for warning message
                        warner(true, 'login');
                        loginValid = true;
                        console.log('LOGIN_AVALIABLE');
                        this.setState({loginValid: loginValid});
                        break;
                    case 403:
                        warner(false, 'login', 'Login is already in use');
                        console.log('LOGIN_IN_USE');
                        break;
                    default: break;
                }
            })
            .catch((error) => {
                console.log('LOGIN_VALIDATION_FETCH_ERROR');
                console.log(error);
                warner(false, 'login', 'Sorry, Login validation failed. Please try again later');
            })
    };
    //validates user input and changing state for form validation
    validateField = (field, value) => {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let checkPassValid = this.state.checkPassValid;

        switch(field){
            case 'email':
                emailValid = value.match(/^([\w.%+]+)@([\w]+\.)+([\w]{2,})$/i);
                break;
            case 'password':
                passwordValid = value.length >= 6;
                break;
            case 'checkPass':
                checkPassValid = value === this.state.password;
                break;
            default:
                break;
        }

        this.setState({ emailValid: emailValid, passwordValid: passwordValid, checkPassValid: checkPassValid}, this.validateForm)
    };
    //warning message function for failed validations, uses tag name where it should appear and status true(no message)/false(add message)
    addWarnMessage = (e) => {
        if (!e.target.value) return;
        switch(e.target.name){
            case 'email':
                warner(!!this.state.emailValid, 'email', 'E-mail is invalid');
                break;
            case 'password':
                warner(this.state.passwordValid, 'password', 'Password too short');
                break;
            case 'checkPass':
                warner(this.state.checkPassValid, 'checkPass', 'Password and check password doesn\'t match' );
                break;
            default:
                break;
        }
};
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('USER_FORM_SENT_TO_SERVER');
        let success = this.state.success;
        const fData = new FormData(e.target);
        const options ={
            method: 'POST',
            cache: 'default',
            body: fData
        };
        fetch('/register', options)
            .then((response) => {
                if(response.status === 200){
                    success = true;
                    console.log('REGISTRATION_SUCCESSFUL');
                    this.setState(({success: success}))
                } else if (response.status === 403){
                    console.log('EMAIL_IS_ALREADY_IN_USE');
                    warner(false, 'form', 'Sorry, E-mail is already in use')
                }
            })
            .catch((error) => {
                console.log('SUBMIT_FETCH_ERROR');
                console.log(error);
                warner(false, 'submit','Sorry it seems something went wrong. Please try again later')
            })
    };
    validateForm(){
        this.setState({formValid: this.state.loginValid && this.state.emailValid && this.state.passwordValid && this.state.checkPassValid});
    }
    render(){
        if(this.state.success){
            return <Redirect to='/webchat'/>
        }
        return (
            <div className='reg-conteiner'>
                <div className='form-header'>
                    <h1>REGISTRATION</h1>
                </div>
                <form className='login-form' onSubmit={this.handleSubmit} id='form'>
                    <div id='login'>
                        <input type='text'  value={this.state.login} placeholder='Login' name='login' onChange={this.handleUserInput} onBlur={this.validateLogin}/>
                    </div>
                    <div id='email'>
                        <input type='email' value={this.state.email} placeholder='E-mail' name='email' onChange={this.handleUserInput} onBlur={this.addWarnMessage}/>
                    </div>
                    <div id='password'>
                        <input type='password' value={this.state.password} placeholder='Password' name='password'  autoComplete="off" onChange={this.handleUserInput} onBlur={this.addWarnMessage}/>
                    </div>
                    <div id='checkPass'>
                        <input type='password' value={this.state.checkPass} placeholder='Repeat password'  autoComplete="off" name='checkPass' onChange={this.handleUserInput} onBlur={this.addWarnMessage}/>
                    </div>
                    <div id='submit'>
                        <button type='submit' className='submit-button' disabled={!this.state.formValid}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}