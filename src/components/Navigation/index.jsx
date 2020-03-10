import React, { useState } from 'react'
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal'

import { withRouter } from 'react-router-dom'

import { AuthUserContext } from '../Session'

import { Link } from 'react-router-dom'

import SignUpForm from '../Auth/SignUp.jsx'
import SignInForm from '../Auth/SignIn.jsx'

import styled from 'styled-components'

const StyledModal = Modal.styled`
  width: 30rem;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 1000ms;
  border-radius: 30px;
`

const RegisterLink = styled(Link)`
	text-decoration: none;
	color: black;
	border: 1px solid gold;
	background-color: gold;
	border-radius: 5px;
	font-size: 1.5rem;
	padding: 5px 20px;
	font-family: 'Zilla Slab', serif;
	margin-right: 20px;
	&:hover {
		background-color: yellow;
	}
`

const Navbar = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding-top: 20px;
`

const LoginLink = styled(Link)`
	text-decoration: none;
	color: white;
	margin-right: 10px;
	font-size: 1.5rem;
	padding: 5px 20px;
	font-family: 'Zilla Slab', serif;
	border-radius: 5px;
`

const SignUpButton = ({ register }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [opacity, setOpacity] = useState(0)

	function toggleModal(e) {
		setIsOpen(!isOpen)
	}

	function afterOpen() {
		setTimeout(() => {
			setOpacity(1)
		}, 20)
	}

	function beforeClose() {
		return new Promise(resolve => {
			setOpacity(0)
			setTimeout(resolve, 200)
		})
	}

	return (
		<div>
			<RegisterLink to='' onClick={toggleModal}>
				Sign Up
			</RegisterLink>
			<StyledModal
				isOpen={isOpen}
				afterOpen={afterOpen}
				beforeClose={beforeClose}
				onBackgroundClick={toggleModal}
				onEscapeKeydown={toggleModal}
				opacity={opacity}
				backgroundProps={{ opacity }}>
				<SignUpForm toggleModal={toggleModal} register={register} />

				{/* <button onClick={toggleModal}>Close me</button> */}
			</StyledModal>
		</div>
	)
}

const LoginButton = ({ login }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [opacity, setOpacity] = useState(0)

	function toggleModal(e) {
		setIsOpen(!isOpen)
	}

	function afterOpen() {
		setTimeout(() => {
			setOpacity(1)
		}, 20)
	}

	function beforeClose() {
		return new Promise(resolve => {
			setOpacity(0)
			setTimeout(resolve, 200)
		})
	}

	return (
		<div>
			<LoginLink to='' onClick={toggleModal}>
				Login
			</LoginLink>
			<StyledModal
				isOpen={isOpen}
				afterOpen={afterOpen}
				beforeClose={beforeClose}
				onBackgroundClick={toggleModal}
				onEscapeKeydown={toggleModal}
				opacity={opacity}
				backgroundProps={{ opacity }}>
				<SignInForm toggleModal={toggleModal} login={login} />

				{/* <button onClick={toggleModal}>Close me</button> */}
			</StyledModal>
		</div>
	)
}

const Navigation = ({ login, register }) => {
	return (
		<Navbar>
			<AuthUserContext.Consumer>
				{authUser =>
					authUser ? (
						<NavigationAuth />
					) : (
						<NavigationNonAuth login={login} register={register} />
					)
				}
			</AuthUserContext.Consumer>
		</Navbar>
	)
}

const NavigationAuth = () => (
	<div direction='row' justify='right' gap='small'>
		{/* <SignOutButton /> */}
	</div>
)

const FadingBackground = styled(BaseModalBackground)`
	opacity: ${props => props.opacity};
	transition: opacity ease 1000ms;
`

const NavigationNonAuth = ({ login, register }) => {
	return (
		<div className='topnav'>
			<ModalProvider backgroundComponent={FadingBackground}>
				<LoginButton login={login} />
			</ModalProvider>
			<ModalProvider backgroundComponent={FadingBackground}>
				<SignUpButton register={register} />
			</ModalProvider>{' '}
		</div>
	)
}

export default withRouter(Navigation)
