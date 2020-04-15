import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../../components/Auth/SignOut';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { getSavedLocations } from '../Redux/actions';

import SavedLocations from './SavedLocations';

const Dashboard = ({ user, getSavedLocations }) => {
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

	useEffect(() => {
		getSavedLocations();
	}, [getSavedLocations])

	const savedLocations = user.savedLocations;

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
			<div className='column-container'>
				<div className='first-column'>
					<div className='user-information'>
						<h2>Hello, {user.username}</h2>
						<img style={profileImg} src={db.user.avatar} alt='default' />
						<p>
							{user.firstname} {user.lastname}
						</p>
						<p>{db.user.location}</p>
						<span>
							<i className='fas fa-envelope'></i> {user.email}
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
							<i className='fas fa-long-arrow-alt-right'></i>
						</p>
					</section>
					<section className='location-listing'>
						<section>
							<b>Philz Coffee</b>
							<br />
							<span>1 Front St #100 San Francisco, CA 94111</span>
						</section>
						<p>
							<i className='fas fa-long-arrow-alt-right'></i>
						</p>
					</section>
					<section className='location-listing'>
						<section>
							<b>Workshop Cafe</b>
							<br />
							<span>180 Montgomery St San Francisco, CA 94104</span>
						</section>
						<p>
							<i className='fas fa-long-arrow-alt-right'></i>
						</p>
					</section>
					<SavedLocations savedLocations={savedLocations}/>
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
			</div>
		</div>
	)
}

export default connect(({ userReducer }) => ({
		user: {...userReducer}
}), { getSavedLocations })(Dashboard)

const profileImg = {
	borderRadius: '50%',
	border: '1px solid #ccc',
	width: '50%'
}

