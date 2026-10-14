import styles from './todoitem.module.scss'
import { type TodoItemType } from '../../todotypes.ts'
import classNames from 'classnames'
type TodoItemProps = {
    item: TodoItemType
    delTodo: (id: number) => void
    toggleTodo: (id: number) => void
}
function TodoItem(props: TodoItemProps) {
  return (
    <div className={styles.todoItem}>
        <div className={classNames(styles.itemCheck, props.item.isDone ? styles.done : styles.undone)}
            onClick={() => props.toggleTodo(props.item.id)}
        ></div>
        <span>{props.item.text}</span>
        <button onClick={() => props.delTodo(props.item.id)}>删除</button>
    </div>
  )
}

export default TodoItem