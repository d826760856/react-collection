import styles from './todoMain.module.scss'
import TodoItem from './todoItem/todoItem.js'
import { useStore } from '../../../hooks/useStore'
import { useEffect } from 'react'
import { getTodoList } from '../../../store/todoStore.js'
function TodoMain() {
  const { useAppSelector, useAppDispatch } = useStore()
  const { todoList } = useAppSelector(state => state.todoReducer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTodoList())
  }, [dispatch])
  return (
    <div className={styles.todoMain}>
      <ul>{todoList.map(item =>
        <TodoItem key={item.id} item={item}/>)}
      </ul>
    </div>
  )
}

export default TodoMain