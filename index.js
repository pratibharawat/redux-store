function createStore() {
    // the store have four parts:
    // the state
    // get the state
    // listen to changes in state
    // update the state

    let state;
    let listeners = []; // listeners are array of functions
    const getState = () => state // returns the state
    
    const subscribe = (listener) => { //listening the changes to the state
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    }
    return {
        getState,
        subscribe
    };  
}
