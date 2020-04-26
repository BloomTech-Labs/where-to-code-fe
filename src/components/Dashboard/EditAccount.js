import React, { useState, useEffect } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import SignOut from '../../components/Auth/SignOut'
import { connect } from 'react-redux'
import axios from 'axios'

import axiosWithAuth from '../../Helpers/axiosWithAuth'

import './Dashboard.scss'

function EditAccount({ user, props }) {
	const avatar =
		user.avatar || 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

	const handleSubmit = e => {
		// e.preventDefault()
		console.log(user.username)

		const data = {
			username: e.target.username.value
		}

		axiosWithAuth()
			.put(`/auth/update`, data)
			.then(res => {
				console.log(res.data)
			})
			.catch(err => {
				console.error(err)
			})
	}

	return (
		<div className='dashboard-container'>
			<nav>
				<section className='nav-links'>
					<i
						className='fas fa-wifi'
						aria-hidden='true'
						style={{ color: 'gold' }}></i>
					<Link to='/'>Home</Link>
					<Link to='/home'>Search</Link>
				</section>
				<section className='nav-buttons'>
					<SignOut />
				</section>
			</nav>
			<div className='edit-container'>
				<h1 className='edit-header'>
					Hi {user.username.toUpperCase()}! <br /> Edit Account Information
				</h1>
				<form onSubmit={handleSubmit}>
					<span className='titles'>username</span>
					<br />
					<input
						type='text'
						name='username'
						placeholder={user.username}
						className='inputBorder'
					/>
					<br />
					{/* <span className='titles'>first name</span>
					<br />
					<input
						type='text'
						name='firstName'
						placeholder='Update first name'
						className='inputBorder'
					/>
					<br />
					<span className='titles'>last name</span>
					<br />
					<input
						type='text'
						name='lastName'
						placeholder='Update last name'
						className='inputBorder'
					/>
					<br /> */}
					<button className='signUpButton' type='submit'>
						Save Changes
					</button>
					<button
						onClick={() => window.history.go(-1)}
						className='cancelButton'>
						Cancel
					</button>
				</form>
			</div>
		</div>
	)
}

export default connect(({ userReducer }) => ({
	user: { ...userReducer }
}))(EditAccount)

const profileImg = {
	borderRadius: '50%',
	border: '1px solid #ccc',
	width: '50%'
}
