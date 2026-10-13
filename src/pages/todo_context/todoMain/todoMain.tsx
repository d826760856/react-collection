import styles from './todoMain.module.scss'
import TodoItem from './todoItem/todoItem.js'

import { useTodo } from '../todo-context.js'
import { useEffect } from 'react'
function TodoMain() {
  const { todoList, getTodoList } = useTodo()
  useEffect(() => {
    getTodoList()
  }, [])
  return (
    <div className={styles.todoMain}>
      <ul>{todoList.map(item =>
        <TodoItem key={item.id} item={item}/>)}
      </ul>
    </div>
  )
}

export default TodoMain