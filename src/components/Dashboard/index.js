import React, { useState } from 'react'
import styled from 'styled-components'
import SignOut from '../../components/Auth/SignOut'
import './Dashboard.scss'

const Dashboard = ({ state, signout }) => {
	const [db, setDb] = useState({
		user: {
			userName: 'User',
			location: 'San Francisco, CA',
			email: 'email@mail.com',
			avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
		},
		location: {
			name: 'Royal Ground Coffee',
			address: '2216 Polk St San Francisco, CA 94109'
		}
	})

	return (
		<div className='dashboard-container'>
			<nav>
				<section className='nav-links'>
					<i
						class='fas fa-wifi'
						aria-hidden='true'
						style={{ color: 'gold' }}></i>
					<a href='#'>Home</a>
					<a href='#'>Search</a>
				</section>
				<section className='nav-buttons'>
					<SignOut signout={signout} />
				</section>
			</nav>
			<div className='column-container'>
				<div className='first-column'>
					<div className='user-information'>
						<h2>Hello, {state.username}</h2>
						<img style={profileImg} src={db.user.avatar} alt='default' />
						<p>
							{state.firstname} {state.lastname}
						</p>
						<p>{db.user.location}</p>
						<span>
							<i class='fas fa-envelope'></i> {db.user.email}
						</span>
					</div>
				</div>
				<div className='column'>
					<h3>Activity</h3>
					<p className='sub-header'>Recently Visited</p>
					<section className='location-listing'>
						<section>
							<b>{db.location.name}</b>
							<br />
							<span>{db.location.address}</span>
						</section>
						<p>
							<i class='fas fa-long-arrow-alt-right'></i>
						</p>
					</section>
					<section className='location-listing'>
						<section>
							<b>Philz Coffee</b>
							<br />
							<span>1 Front St #100 San Francisco, CA 94111</span>
						</section>
						<p>
							<i class='fas fa-long-arrow-alt-right'></i>
						</p>
					</section>
					<section className='location-listing'>
						<section>
							<b>Workshop Cafe</b>
							<br />
							<span>180 Montgomery St San Francisco, CA 94104</span>
						</section>
						<p>
							<i class='fas fa-long-arrow-alt-right'></i>
						</p>
					</section>
					<p className='sub-header'>Saved Locations</p>
					<section className='location-listing'>
						<section>
							<b>Jane on Fillmore</b>
							<br />
							<span>2123 Fillmore St San Francisco, CA 94115</span>
						</section>
						<p>
							<i class='fas fa-heart'></i>
						</p>
					</section>
					<section className='location-listing'>
						<section>
							<b>{db.location.name}</b>
							<br />
							<span>{db.location.address}</span>
						</section>
						<p>
							<i class='fas fa-heart'></i>
						</p>
					</section>
					<section className='location-listing'>
						<section>
							<b>The Social Study</b>
							<br />
							<span>1795 Geary Blvd San Francisco, CA 94115</span>
						</section>
						<p>
							<i class='fas fa-heart'></i>
						</p>
					</section>
				</div>

				<div className='column'>
					<h3>Nearby Locations</h3>
					<p className='sub-header'>
						San Francisco, CA. Mission District 94103
					</p>
					<section className='nearby-listing'>
						<img
							src='https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg'
							alt=''
						/>
						<article>
							<b>Dolores Park Cafe</b>
							<span>501 Dolores St, San Francisco, CA 94110</span>
							<span>7AM - 8PM ⋅ (415) 621-2936</span>
						</article>
					</section>
					<section className='nearby-listing'>
						<img
							src='https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg'
							alt=''
						/>
						<article>
							<b>Mission Branch Library</b>
							<span>300 Bartlett St, San Francisco, CA 94110</span>
							<span>10AM - 9PM ⋅ (415) 355-2800</span>
						</article>
					</section>
				</div>
				{/* <div className='column'>
					<h3>Other stuff I guess</h3>
				</div> */}
			</div>
		</div>
	)
}

export default Dashboard

const profileImg = {
	borderRadius: '50%',
	border: '1px solid #ccc',
	width: '50%'
}

const firstColumn = {
	border: '1px solid transparent',
	width: '40%',
	margin: '100px 20px 20px 20px',
	background: 'transparent',
	textAlign: 'center'
}
