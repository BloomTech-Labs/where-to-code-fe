import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import SignOut from '../../components/Auth/SignOut'
import { connect } from 'react-redux'

import axiosWithAuth from '../../Helpers/axiosWithAuth'

import './Dashboard.scss'

function EditAccount({ user }) {
	const avatar =
		user.avatar || 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

	const handleSubmit = e => {
		e.preventDefault()

		const data = {
			username: e.target.username.value || user.username,
			email: e.target.email.value || user.email
		}

		axiosWithAuth()
			.put(`/auth/update`, data)
			.then(res => {
				console.log(res.data)
				alert(`Information has been updated!`)
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
					Hi {user.username.toUpperCase()}! <br /> Edit Account Credentials
				</h1>
				<img style={profileImg} src={avatar} alt='default' />
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
					<span className='titles'>Email</span>
					<br />
					<input
						type='text'
						name='email'
						placeholder={user.email}
						className='inputBorder'
					/>
					<br />
					<button className='submitButton' type='submit'>
						Save Changes
					</button>
				</form>
				<br />
				<br />
				<br />
				<NavLink className='backToDash' to='/dashboard'>
					&larr; Back to Dashboard
				</NavLink>
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
	width: '200px'
}
