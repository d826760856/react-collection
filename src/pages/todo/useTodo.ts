import { useState, useEffect } from 'react'
import { type TodoItemType } from './todotypes.ts'

export const useTodo = () => {
    const fixTodoList = [
        { id: 1, text: 'Todo 1', isDone: true },
        { id: 2, text: 'Todo 2', isDone: false },
        { id: 3, text: 'Todo 3', isDone: false },
        { id: 4, text: 'Todo 4', isDone: false },
    ]
    const [todoList, setTodoList] = useState<TodoItemType[]>([])
    // 模拟异步请求数据
    useEffect(() => {
        setTimeout(() => {
            setTodoList(fixTodoList)
        }, 2000)
    }, [])
    // 添加todo
    const addTodo = (text: string) => {
        setTodoList([...todoList, { id: Date.now(), text, isDone: false }])
    }
    // 删除todo
    const delTodo = (id: number) => {
        setTodoList(todoList.filter(item => item.id !== id))
    }
    // 切换todo状态
    const toggleTodo = (id: number) => {
        setTodoList(todoList.map(item => item.id === id ? { ...item, isDone: !item.isDone } : item))
    }
    return {
        todoList,
        addTodo,
        delTodo,
        toggleTodo
    }
}

