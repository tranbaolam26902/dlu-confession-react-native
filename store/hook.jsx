import { useContext } from 'react';
import Context from './Context';

// Hook for global states
const useStore = () => {
    const [states, dispatch] = useContext(Context);
    return [states, dispatch];
};

export { useStore };
