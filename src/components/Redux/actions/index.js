export const UPDATE_INFO = 'UPDATE_INFO'

export const userName = name => {
	return {
		type: UPDATE_INFO,
		payload: name
	}
}
