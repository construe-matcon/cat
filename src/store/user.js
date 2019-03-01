export default {
	namespaced: true,
	state: {
		user: {
			'name': 'abcdefzzzzz'
		},
	},
	mutations: {
		setUserProfileChange(state, userInfos) {
			state.user = userInfos;
		},
	},
	actions: {
		setUserProfileChange({ commit }, userInfos) {
			commit('setUserProfileChange', userInfos);
		},
	},
};
