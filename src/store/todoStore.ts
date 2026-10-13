import { createSlice } from "@reduxjs/toolkit";
import type { TodoItemType } from '../todo_redux/todotypes'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isPending } from "@reduxjs/toolkit";

type initialStateType = {
    todoList: TodoItemType[],
    isLoading: boolean
}

const initialState: initialStateType = {
    todoList: [],
    isLoading: false
}

const todoStore = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // 添加todo
        addTodo: (state, action) => {
            state.todoList = [...state.todoList, { id: Date.now(), text: action.payload, isDone: false }]
        },
        // 删除todo
        delTodo: (state, action) => {
            state.todoList = state.todoList.filter(item => item.id !== action.payload)
        },
        // 切换todo状态
        toggleTodo: (state, action) => {
            state.todoList = state.todoList.map(item => item.id === action.payload ? { ...item, isDone: !item.isDone } : item)
        },
        // 设置todoList
        setTodoList: (state, action) => {
            state.todoList = action.payload
        },
        // 设定loading状态
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodoList.fulfilled, (state, action) => {
            state.todoList = action.payload as TodoItemType[]
        }),
        builder.addMatcher(isPending(getTodoList), (state, action)=> {
            state.isLoading = action.payload!
        })
    }
})

// 抛出action creator
export const { addTodo, delTodo, toggleTodo, setTodoList } = todoStore.actions

const getTodoList = createAsyncThunk('todo/getTodoList', async () => {
    const fixTodoList = [
        { id: 1, text: 'Todo 1', isDone: true },
        { id: 2, text: 'Todo 2', isDone: false },
        { id: 3, text: 'Todo 3', isDone: false },
        { id: 4, text: 'Todo 4', isDone: false },
    ]
    const todoListData = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fixTodoList)
        }, 2000)
    })
    return todoListData
})
// 抛出异步函数
export { getTodoList }

const todoReducer = todoStore.reducer

//抛出reducer用于store组合
export default todoReducer