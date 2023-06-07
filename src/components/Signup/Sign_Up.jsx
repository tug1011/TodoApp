import React, { useState } from 'react';
import "./SignUpStyle.css"
import axios from 'axios';
import { Link, } from 'react-router-dom';
import SignIn from "../Signin/Log_In.jsx";
import { Route, Routes, useNavigate } from 'react-router'


const SignUp = () => {
	
	
	const [formResgiter, setFormResgiter] = useState({
		username: "",
		password: ""

	})
	const handleChange = (e) => {
		const { name, value } = e.target
		setFormResgiter({
			...formResgiter,
			[name]: value
		})
	}
	
	
	const handleCreat = async () => {
		const res = await axios.post("http://localhost:3001/api/auth/register", formResgiter)
		console.log(res);
		console.log(res.data.accessToken);
		localStorage.setItem(`accessToken`, res.data.accessToken)
		
		

	}
	return (
		<>

			<form>
				<h2>Sign Up</h2>
				<p>
					<label htmlFor="UserName" className="floatLabel">Username</label>
					<input id="Username" name="username" type="text" onChange={handleChange}></input>
				</p>
				<p>
					<label htmlFor="password" className="floatLabel">Password</label>
					<input id="password" name="password" type="password" onChange={handleChange}></input>
					
				</p>
					<Link to={"/login"}>
						<button value="Create My Account" id="submit" onClick={handleCreat}>Sign Up</button>
					</Link>
							
	
			</form>
					
			
		</>


	)
}

export default SignUp;
