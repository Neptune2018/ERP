// these files is for vuex but I have not coded in here
// I only make example in moudules because it is more complex
import utils from '../utils'

export const setState = ({ state }, {user, role, features}) => {
    return new Promise((resolve, reject) => {
    	state.user = user
    	state.role = role
   		state.features = features
    	state.isLogin = 1
        resolve()
    })
}

export const hasFeature = ({state}, feature) => {
	console.log(state);
	return new Promise((resolve, reject) => {
		if (utils.isInArray(state.features, feature)){
			resolve()
		}
		else{
			reject()
		}
	})
}