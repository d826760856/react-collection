import styles from './todoMain.module.scss'
import TodoItem from './todoItem/todoItem.js'
import { type TodoItemType } from '../todotypes.ts'
type TodoMainProps = {
  todoList: TodoItemType[]
  delTodo: (id: number) => void
  toggleTodo: (id: number) => void
}
function TodoMain(props: TodoMainProps) {
  const { todoList, delTodo, toggleTodo } = props
  return (
    <div className={styles.todoMain}>
      <ul>{todoList.map(item =>
        <TodoItem key={item.id} item={item} delTodo={delTodo} toggleTodo={toggleTodo} />)}
      </ul>
    </div>
  )
}

export default TodoMain