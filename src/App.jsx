import { useState, } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Router, Route, Routes } from 'react-router'
import Counter from "./components/Demo.jsx"
import SignUp from "./components/Signup/Sign_Up.jsx"
import LogIn from './components/Signin/Log_In.jsx'
import { BrowserRouter } from 'react-router-dom'
import Home from "./components/Home/Home.jsx"

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<head>
				<title>TodoApp</title>
			</head>
			
				{/* <SignUp /> */}
			<BrowserRouter >
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="login" element={<LogIn />}></Route>
					<Route path="signup" exact  element={<SignUp />}></Route>

				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
