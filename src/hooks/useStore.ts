import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/index'


export const useStore = () => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    return {
        useAppDispatch,
        useAppSelector
    }
}