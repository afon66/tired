import profileReducer, { addPost, deletePost } from './profile-reducer'

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'It\'s my first post', likesCount: 11 },
    { id: 3, message: 'Blabla', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ]
}

it('postLength should increment', () => {
  let action = addPost('Junior frontend developer')

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(5)
})

it('postMessage should be correct', () => {
  let action = addPost('Junior frontend developer')

  let newState = profileReducer(state, action)

  expect(newState.posts[4].message).toBe('Junior frontend developer')
})

it('after delete postMessage should decrement', () => {
  let action = deletePost(1)

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(3)
})