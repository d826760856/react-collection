import axios from 'axios'
import {create, type StateCreator} from 'zustand'

type countStateType = {
    count: number,
    inc: () => void
}
const counterStore: StateCreator<countStateType> = (set) => {
    return {
        count: 5,
        inc: () => {
            set(state => ({ count: state.count + 10 })) 
        }
    }
}
type post = {
    id: string, title: string, view: number
}
type postStateType = {
    posts: post[],
    getPosts: () => void
}
const postsStore: StateCreator<postStateType> = (set) => {
    return {
        posts: [],
        getPosts: async () => {
            const res = await axios.get('http://localhost:3000/posts')
            const posts = res.data as post[]
            set({ posts })
        }
    }
}

type storeStateType = countStateType & postStateType
const useStore = create<storeStateType>((...arg) => {
    return {
        ...counterStore(...arg),
        ...postsStore(...arg)
    }
})
export default useStore