import { useEffect } from "react"
import useStore from "./counter_zustand_Store"

function Counter_zustand() {
    const { count, inc, posts, getPosts } = useStore()
    // useEffect(() => {
    //     getPosts()
    // }, [getPosts])
    return(
        <div>
            {count}
            <button onClick={inc} >++++</button>
            <ul>
                { posts.map(item => <li>{item.title}-{item.view}</li>) }
            </ul>
        </div>
    )
}
export default Counter_zustand