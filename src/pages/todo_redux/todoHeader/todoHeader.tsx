import { useState } from 'react'
import styles from './todoHeader.module.scss'
import { useUser } from '../../../user-context'
import { useStore } from '../../../hooks/useStore'
import { addTodo } from '../../../store/todoStore' 
function TodoHeader() {
  const { user } = useUser()
  const [inputValue, setInputValue] = useState('')
  const { useAppDispatch } = useStore()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.todoHeader}>
      <div className={styles.leftRow}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={() => {
          if (inputValue.trim()) {
            dispatch(addTodo(inputValue.trim()))
            setInputValue('')
          }
        }}>
          添加
        </button>
      </div>
      <div className={styles.rightPhoto} onClick={() => console.log(user)}>
      </div>
    </div>
  )
}

export default TodoHeader