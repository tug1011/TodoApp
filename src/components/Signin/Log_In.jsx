import React, { useState } from 'react';
import "./Log_In.css"
import { Link, } from 'react-router-dom';
import axios from 'axios';


const LogIn = () => {
    const [status, setStatus] = useState(false);
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""

    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormLogin({
            ...formLogin,
            [name]: value
        })
        
    }
    const handleLogin = async () => {
        const res = await axios.post("http://localhost:3001/api/auth/login", formLogin)
        console.log(res);
        setStatus(true)
        localStorage.setItem("username",formLogin.username)
        
    }
    return (
        <div className='logIn_container'>
            
                <form autoComplete='off' className='form'>
                    <div className='control'>
                        <h1>
                            Sign In
                        </h1>
                    </div>
                    <div className='control block-cube block-input'>
                        <input name='username' placeholder='Username' type='text' onChange={handleChange}></input>
                        <div className='bg-top'>
                            <div className='bg-inner'></div>
                        </div>
                        <div className='bg-right'>
                            <div className='bg-inner'></div>
                        </div>
                        <div className='bg'>
                            <div className='bg-inner'></div>
                        </div>
                    </div>
                    <div className='control block-cube block-input'>
                        <input name='password' placeholder='Password' type='password' onChange={handleChange}></input>
                        <div className='bg-top'>
                            <div className='bg-inner'></div>
                        </div>
                        <div className='bg-right'>
                            <div className='bg-inner'></div>
                        </div>
                        <div className='bg'>
                            <div className='bg-inner'></div>
                        </div>
                    </div>
                    {status &&
                        <Link to={"/"}>

                            <button className='btn block-cube block-cube-hover' type='button' onClick={handleLogin}>
                                <div className='bg-top'>
                                    <div className='bg-inner'></div>
                                </div>
                                <div className='bg-right'>
                                    <div className='bg-inner'></div>
                                </div>
                                <div className='bg'>
                                    <div className='bg-inner'></div>
                                </div>
                                <div className='text'>
                                    Log In
                                </div>
                            </button>
                        </Link>
                    }
                    {!status &&
                        <>
                            <h3 style={{ color: "red" }}>UserName or password is incorrect</h3>
                            <button className='btn block-cube block-cube-hover' type='button' onClick={handleLogin}>
                                <div className='bg-top'>
                                    <div className='bg-inner'></div>
                                </div>
                                <div className='bg-right'>
                                    <div className='bg-inner'></div>
                                </div>
                                <div className='bg'>
                                    <div className='bg-inner'></div>
                                </div>
                                <div className='text'>
                                    Log In
                                </div>
                            </button>
                        </>

                    }


                </form>
                <span className='text_signUp'>Don't have account?</span>
                <Link to={"/signup"}>
                    <div>

                        <Link to={"/signup"}>
                            <button className='glowing-btn'><span className='glowing-txt'>SIG<span className='faulty-letter'>N</span>UP</span></button>
                        </Link>
                    </div>
                </Link>
            
        </div>
    );
}

export default LogIn;

