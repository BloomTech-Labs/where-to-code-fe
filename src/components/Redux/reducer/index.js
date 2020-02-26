import { UPDATE_INFO } from '../actions'

const initialState = {
	username: ''
}

export const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_INFO:
			return {
				...state,
				username: action.payload
			}
	}
}
