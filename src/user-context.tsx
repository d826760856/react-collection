import { createContext } from 'react'
import { useState, useContext } from 'react'

type User = {
    name: string,
    age: number
}

type UserContextType = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const userCtx = createContext<UserContextType | undefined>(undefined)

type UserProviderProps = {
    children: React.ReactNode
}

export const UserProvider = (props: UserProviderProps) => {
    const { children } = props
    const [user, setUser] = useState<User | undefined>(
        {name: 'John Doe', age: 30}
    )
  return (
    <userCtx.Provider value={{ user, setUser }}>
        {children}
    </userCtx.Provider>)
}

export const useUser = () => {
    const userData = useContext(userCtx)
    if (!userData) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return userData
}