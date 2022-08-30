import shortid from 'shortid';

//selectors
export const getAllPosts = ({ posts }) => posts;
export const getPostById = ({ posts }, postId) => posts.find(post => post.id === postId);
export const getPostByCategory = ({ posts }, postCategory) => posts.filter(post => post.category === postCategory);


// actions
const createActionName = actionName => `app/posts/${actionName}`;

const REMOVE_POST = createActionName('REMOVE_POST')
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

// action creators
export const removePost = payload => ({type: REMOVE_POST, payload})
export const addPost = payload => ({type: ADD_POST, payload})
export const editPost = payload => ({type: EDIT_POST, payload})

const postsReducer = (statePart = [], action) => {
  switch(action.type) {
      case REMOVE_POST:
        return statePart.filter(post => post.id !== action.payload);
      
      case ADD_POST:
        return [...statePart, { ...action.payload, id: shortid()}]

      case EDIT_POST:
        return statePart.map(post => (post.id === action.payload.postData.id ? { ...post, ...action.payload } : post));
      
      default:
        return statePart;
  }
}

export default postsReducer