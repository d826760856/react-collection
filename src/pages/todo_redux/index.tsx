
import styles from './index.module.scss'
import TodoHeader from './todoHeader/todoHeader.js'
import TodoMain from './todoMain/todoMain.js'

function Todo() {

  return (
    <div className={styles.todo}>
      <TodoHeader/>
      <TodoMain/>
    </div>
  )
}

export default Todo