import { useState } from 'react'
import styles from './todoHeader.module.scss'
import { useUser } from '../../../user-context'
type todoHeaderProps = {
  addTodo: (text: string) => void
}
function TodoHeader(props: todoHeaderProps) {
  const { addTodo } = props
  const { user } = useUser()
  const [inputValue, setInputValue] = useState('')

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
            addTodo(inputValue.trim())
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