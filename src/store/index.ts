import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterStore'
import todoReducer from './todoStore'

const store = configureStore({
  reducer: {
    counterReducer,
    todoReducer
  }
})
export default store

// 关键：从 store 推导出 RootState 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch