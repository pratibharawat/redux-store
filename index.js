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

function todos (state = [], action) { //todos is a reducer which is a pure function
    //reducer takes in the state and the action and returns the new state
if (action.type === 'ADD_TODO') {
return state.concat([action.todo]);
}
return state;
}
