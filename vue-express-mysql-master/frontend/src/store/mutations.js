export const setUserState = (state, {
    user, role, features
}, sessionKey) => {
    state.user = user
    state.role = role
    state.features = features
}