import styles from './todoitem.module.scss'
import { type TodoItemType } from '@/pages/todo_context/todotypes'
import classNames from 'classnames'

import { useTodo } from '@/pages/todo_context/todo-context'
type TodoItemProps = {
    item: TodoItemType
}
function TodoItem(props: TodoItemProps) {

  const { toggleTodo, delTodo } = useTodo()
  return (
    <div className={styles.todoItem}>
        <div className={classNames(styles.itemCheck, props.item.isDone ? styles.done : styles.undone)}
            onClick={() => toggleTodo(props.item.id)}
        ></div>
        <span>{props.item.text}</span>
        <button onClick={() => delTodo(props.item.id)}>删除</button>
    </div>
  )
}

export default TodoItem