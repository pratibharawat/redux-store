// Library Code

// pure function requirements:
// 1. return the same result if the same arguments are passed in
// 2. depend solely on the arguments
// 3. do no produce side effects

function createStore(reducer) {
    // the store have four parts:
    // the state
    // get the state
    // listen to changes in state
    // update the state

    let state;
    let listeners = []; // listeners are array of functions
    const getState = () => state // returns the state
    
    const subscribe = (listener) => { // listening the changes to the state
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener()); // loop through listeners to update state
        }
    }

    const dispatch = (action) => { // updates the state
        state = reducer(state, action);
        listeners.forEach((listener) => listener);  
    }
    return {
        getState,
        subscribe,
        dispatch
    };
}


// App Code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function todos (state = [], action) { //todos is a reducer which is a pure function
    //reducer takes in the state and the action and returns the new state
    switch(action.type) {
        case ADD_TODO:
          return state.concat([action.todo])
        case REMOVE_TODO:
          return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
          return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, { complete: !todo.complete }))
        default :
          return state
    }
}

// another reducer which will maintain goals
function goals (state = [], action) { 
    switch(action.type) {
      case ADD_GOAL:
        return state.concat([action.goal])
      case REMOVE_GOAL:
        return state.filter((goal) => goal.id !== action.id)
      default :
        return state
    }
}

// root reducer
function app (state = {}, action) {
    return {
      todos: todos(state.todos, action),
      goals: goals(state.goals, action),
    }
  }

// create the store

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})