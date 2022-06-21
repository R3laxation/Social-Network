import {addPost, ProfilePageStateType, profileReducer} from "./Profile-reducer";

const state: ProfilePageStateType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: "22"},
        {id: 2, message: "It is my first post\"", likesCount: "57"},
    ],
    profile: {},
    status: ""
};


it('length of post should be incremented', () => {

    // 1. Start Data


    let action = addPost('it-kamasutra',)

    // 2. Action
    let newState = profileReducer(state, action)
    // 3. Expect result
    expect (newState.posts.length).toBe(3)
})


