import { useReducer } from "react"

type State = {
    count: number
}

type Action = {
    type: 'INC' | 'DEC' | 'SET',
    payload?: any
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INC': return { count: state.count + 1 };
        case 'DEC': return { count: state.count - 1 };
        case 'SET': return { count: state.count + action.payload };
        default: return state;
    }
    
}

function Counter_useReducer() {
    const [state, dispatch] = useReducer(reducer, { count: 0 })
    return (
        <>
            <button onClick={() => dispatch({ type: 'DEC' })}>---</button>
            <span>{state.count}</span>
            <button onClick={() => dispatch({ type: 'INC' })}>+++</button>
        </>
    )
}
export default Counter_useReducer