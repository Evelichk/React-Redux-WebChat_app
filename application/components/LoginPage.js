'use strict';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {warner} from "../../libs/warner";


export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        const options ={
            method: 'POST',
            cache: 'default',
            body: data
        };
        fetch('/login', options)
            .then((response) => {
                if (response.status !== 200){
                    console.log('LOGIN_OR_PASSWORD_INVALID');
                    warner(false, 'loginSubmit', 'Login or Password is invalid')
                } else {
                    this.setState({success: true})
                }

            })
            .catch((error) => {
                console.log('LOGIN_SUBMIT_FETCH_ERROR');
                warner(false, 'loginSubmit','Sorry it seems something went wrong. Please try again later')
            })

    };
    render(){
        if (this.state.success === true){
            return <Redirect to='/webchat'/>
        }
        return (
            <div className='login-conteiner'>
                <div className='form-header'><h1>SIGN IN TO WEBCHAT</h1></div>
                <form className='login-form' id='loginSubmit' onSubmit={this.handleSubmit}>
                    <div><input type='text' autoComplete="on" placeholder='Login' name='username'/></div>
                    <div><input type='password' autoComplete="on" placeholder='Password' name='password'/></div>
                    <div>
                        <button type='submit' className='submit-button'>Sign In</button>
                    </div>
                </form>
                <div className='reg-link'><Link to="/registration">Registration</Link></div>
            </div>
        )

    }
}