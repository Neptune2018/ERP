// these files is for vuex but I have not coded in here
// I only make example in moudules because it is more complex
import utils from '../utils'
import { setUserState} from './mutations'

export const setState = ({ state, commit }, {user, role, features}) => {
    return new Promise((resolve, reject) => {
    	// state.user = user
    	// state.role = role
   		// state.features = features
    	// state.isSignin = 1
        commit('setUserState',{user: user, role:role , features: features, isSignin: true})
        console.log("yes", state)
        resolve()
    })
}

export const resetState = ({ state, commit }) => {
    return new Promise((resolve, reject) => {
    	// state.user = {}
    	// state.role = ''
   		// state.features = []
    	// state.isSignin = 0
        console.log("yes", state)
        commit('setUserState', {user: {}, role: '' ,features: [], isSignin: false})
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