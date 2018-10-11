'use strict';
import React from 'react';
import { Link } from 'react-router-dom';

export const LogForm = ()=>(
            <div className='login-conteiner'>
                <div className='form-header'><h1>SIGN IN TO WEBCHAT</h1></div>
                <form className='login-form'>
                    <div><input type='text' autoComplete="on" placeholder='Login'/></div>
                    <div><input type='password' autoComplete="on" placeholder='Password'/></div>
                    <div>
                        <button type='submit' className='submit-button'>Sign In</button>
                    </div>
                </form>
                <div className='reg-link'><Link to="/registration">Registration</Link></div>
            </div>
);
