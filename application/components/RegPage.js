'use strict';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { warnToggle } from "../../libs/signToggle";


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
    validateLogin = (e) => {
        let loginValid = this.state.loginValid;
        const options = {
            method: 'POST',
            cache: 'default',
            body: e.target.value
        };

        //fetching login to the server for search if it's already exsits in DB
        fetch('/validlogin', options)
            .then((response) => {
                let stat;
                if(response.status === 200){
                    stat = true;
                } else {
                    stat = false
                }
                switch(response.status){
                    case 200:
                        // toggle function for warning message
                        warnToggle('login', stat);
                        loginValid = true;
                        console.log('LOGIN_AVALIABLE');
                        this.setState({loginValid: loginValid});
                        break;
                    case 403:
                        warnToggle('login', stat);
                        console.log('LOGIN_IN_USE');
                        break;
                    default: break;
                }
            });
    };
    validateField = (field, value) => {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let checkPassValid = this.state.checkPassValid;

        switch(field){
            case 'email':
                emailValid = value.match(/^([\w.%+]+)@([\w]+\.)+([\w]{2,})$/i);
                console.log(emailValid);
                warnToggle('email', emailValid);
                break;
            case 'password':
                passwordValid = value.length >= 6;
                warnToggle('password', passwordValid);
                break;
            case 'checkPass':
                checkPassValid = value === this.state.password;
                warnToggle('checkPass', checkPassValid);
                break;
            default:
                break;
        }

        this.setState({ emailValid: emailValid, passwordValid: passwordValid, checkPassValid: checkPassValid}, this.validateForm)
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('USER FORM SENT TO SERVER');
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
                    console.log('REGISTRATION SUCCESSFUL');
                    this.setState(({success: success}))
                }
            });
    };
    validateForm(){
        this.setState({formValid: this.state.loginValid && this.state.emailValid && this.state.passwordValid && this.state.checkPassValid});
    }
    render(){
        if(this.state.success === true){
            return <Redirect to='/webchat'/>
        }
        return (
            <div className='reg-conteiner'>
                <div className='form-header'>
                    <h1>REGISTRATION</h1>
                </div>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <div id='login-warning'>
                        <input type='text'  value={this.state.login} placeholder='Login' name='login' autoComplete="off" onChange={this.handleUserInput} onBlur={this.validateLogin}/>
                    </div>
                    <div id='email-warning'>
                        <input type='email' value={this.state.email} placeholder='E-mail' name='email'  autoComplete="off" onChange={this.handleUserInput}/>
                    </div>
                    <div id='password-warning'>
                        <input type='password' value={this.state.password} placeholder='Password' name='password'  autoComplete="off" onChange={this.handleUserInput}/>
                    </div>
                    <div id='checkPass-warning'>
                        <input type='password' value={this.state.checkPass} placeholder='Repeat password'  autoComplete="off" name='checkPass' onChange={this.handleUserInput}/>
                    </div>
                    <div>
                        <button type='submit' className='submit-button' disabled={!this.state.formValid}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}