export const setUserState = (state, user, role, features) => {
    state.user = user
    state.role = role
    state.features = features
    state.isLogin = 1
}