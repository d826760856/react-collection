import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { TodoItemType } from "./todotypes";

type TodoCtxType = {
    todoList: TodoItemType[]
    addTodo: (text: string) => void
    delTodo: (id: number) => void
    toggleTodo: (id: number) => void
    getTodoList: () => Promise<TodoItemType[]>
}

const todoCtx = createContext<TodoCtxType | undefined>(undefined)

type TodoProviderProps = {
    children: React.ReactNode
}

export const TodoProvider = (props: TodoProviderProps) => {
    const { children } = props
    const [todoList, setTodoList] = useState<TodoItemType[]>([])

    const addTodo = useCallback((text: string) => {
        setTodoList(prev => [...prev, { id: Date.now(), text, isDone: false }])
    }, [])

    const delTodo = useCallback((id: number) => {
        setTodoList(prev => prev.filter(item => item.id !== id))
    }, [])

    const toggleTodo = useCallback((id: number) => {
        setTodoList(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isDone: !item.isDone } : item
            )
        )
    }, [])

    const getTodoList = async () => {
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
        }) as TodoItemType[]
        setTodoList(todoListData)
        return todoListData
    }

    const value = useMemo(
        () => ({ todoList, addTodo, delTodo, toggleTodo, getTodoList }),
        [todoList, addTodo, delTodo, toggleTodo, getTodoList]
    )

    return (
        <todoCtx.Provider value={value}>
            {children}
        </todoCtx.Provider>
    )
}

export const useTodo = () => {
    const ctx = useContext(todoCtx)
    if (!ctx) {
        throw new Error('useTodo must be used within a TodoProvider')
    }
    return ctx
}