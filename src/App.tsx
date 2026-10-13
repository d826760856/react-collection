import { UserProvider } from './user-context.tsx'
import './App.scss'

import { Provider } from 'react-redux'
import store from './store/index.ts'

import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Provider store={store}>
          <RouterProvider router={router}>
          </RouterProvider>
        </Provider>
      </UserProvider>
    </div>
  )
}

export default App
