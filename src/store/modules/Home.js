const state = {
    screenWidth: document.body.clientWidth,
}

const mutations = {
    'SET_SCREEN_WIDTH' (state, result) {
        state.screenWidth = result;
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}