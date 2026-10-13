
import styles from './index.module.scss'
import TodoHeader from './todoHeader/todoHeader.js'
import TodoMain from './todoMain/todoMain.js'
import { TodoProvider } from './todo-context.js'

function Todo() {

  return (
    <div className={styles.todo}>
      <TodoProvider>
        <TodoHeader/>
        <TodoMain/>
      </TodoProvider>
    </div>
  )
}

export default Todo