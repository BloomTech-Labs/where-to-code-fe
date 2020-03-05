import React from 'react'
import Navigation from './Navigation/index'
import { black } from 'color-name'

const dashContainer = {
	display: 'flex'
}

const profileImg = {
	borderRadius: '50%',
	border: '1px solid #ccc',
	width: '20%'
}

const UserDashboard = () => {
	return (
		<div style={dashContainer}>
			<Navigation />
			<div className='infoColumn'>
				<p>Username</p>
				<img
					style={profileImg}
					src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
					alt='default'
				/>
			</div>
			<div className='activity'>
				<h1>Activity</h1>
			</div>
		</div>
	)
}

export default UserDashboard
