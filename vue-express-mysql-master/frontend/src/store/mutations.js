export const setUserState = (state, {user, role, features, isSignin}) => {
    state.user = user
    state.role = role
    state.features = features
    state.isSignin = isSignin
	console.log("mutation", state)
}