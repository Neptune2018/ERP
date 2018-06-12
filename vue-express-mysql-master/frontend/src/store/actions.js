// these files is for vuex but I have not coded in here
// I only make example in moudules because it is more complex
import utils from '../utils'
import { setUserState} from './mutations'
import localstorage from 'localstorage'
import Vue from 'vue'

export const setState = ({ state, commit }, {user, role, features}) => {
    return new Promise((resolve, reject) => {
    	// state.user = user
    	// state.role = role
   		// state.features = features
    	// state.isSignin = 1
        if (!user.phone) {
            commit('setUserState', {user: {}, role: '' ,features: [], isSignin: false})
            window.localStorage.removeItem('username')
            resolve()
            return;
        }
        commit('setUserState',{user: user, role:role , features: features, isSignin: true})
        window.localStorage.username = user.phone
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
        window.localStorage.removeItem('username')
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

export const initState = ({state, commit}) => {
    return new Promise((resolve, reject) => {
        let username = window.localStorage.username
        console.log("localstorage", username);
        if (typeof(username) == null || username === '' || typeof(username) == undefined) {
            resetState({ state, commit }).then(function() {
                reject()
            })
        } else {
            Vue.http({
                url: '/sessionin',
                method: 'POST',
                body: {
                    username: username
                },
            }).then(function (res) {
                console.log("init", res.body)
                console.log("initState", state);
                if (res.body !== 'fail'){
                    setState({ state, commit }, res.body).then(function() {
                        resolve()
                    })
                }
                else {
                    resetState({ state, commit }).then(function() {
                        reject()
                    })
                }
            }, function (res) {
                resetState({ state, commit }).then(function() {
                    reject()
                })
            })
            
        }
    })
}