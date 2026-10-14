
import styles from './index.module.scss'
import TodoHeader from './todoHeader/todoHeader.js'
import TodoMain from './todoMain/todoMain.js'
import { useTodo } from './useTodo.ts'

function Todo() {
  const {todoList, addTodo, delTodo, toggleTodo} = useTodo()

  return (
    <div className={styles.todo}>
      <TodoHeader addTodo={addTodo} />
      <TodoMain todoList={todoList} delTodo={delTodo} toggleTodo={toggleTodo}/>
    </div>
  )
}

export default Todo