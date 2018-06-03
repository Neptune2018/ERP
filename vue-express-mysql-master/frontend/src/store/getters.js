/**
 *获取用户全部信息
 *@method getUser
 *@return {Object} user
 */
export const getUser = (state) => {
    return state.user
}


export const getUserId = (state) => {
    return state.user.id
}


export const getRole = (state) => {
    return state.role
}

export const getFeatures = (state) => {
    return state.features
}

export const isLogin = (state) => {
	return state.isLogin
}