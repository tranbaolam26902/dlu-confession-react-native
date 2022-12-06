import { useReducer } from 'react';
import Context from './Context';
import reducer, { initStates } from './reducer';

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initStates);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
