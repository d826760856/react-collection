import styles from './todoitem.module.scss'
import { type TodoItemType } from '../../todotypes.ts'
import classNames from 'classnames'
import { useStore } from '../../../../hooks/useStore.ts'
import { toggleTodo, delTodo } from '../../../../store/todoStore.ts'
type TodoItemProps = {
    item: TodoItemType
}
function TodoItem(props: TodoItemProps) {
  const { useAppDispatch } = useStore()
  const dispatch = useAppDispatch()
  return (
    <div className={styles.todoItem}>
        <div className={classNames(styles.itemCheck, props.item.isDone ? styles.done : styles.undone)}
            onClick={() => dispatch(toggleTodo(props.item.id))}
        ></div>
        <span>{props.item.text}</span>
        <button onClick={() => dispatch(delTodo(props.item.id))}>删除</button>
    </div>
  )
}

export default TodoItem