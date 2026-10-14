
import { useEffect } from 'react';
import { useStore } from '../hooks/useStore.ts';
import { increment, decrement, addNum, getChannelList } from '../store/counterStore.ts'

function Counter() {
    const { useAppSelector, useAppDispatch } = useStore()
    const { count, channelList } = useAppSelector((state) => state.counterReducer);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getChannelList()) 
    },[])

    return (
        <div>
            <button onClick={() => dispatch(decrement())}>-</button>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addNum(5))}>++++</button>
            <ul>
                {channelList.map(channel => <li key={channel.id}>{channel.name}</li>)}
            </ul>
        </div>
    )
}
export default Counter