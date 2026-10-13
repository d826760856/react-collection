import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isPending, isRejected, isFulfilled } from '@reduxjs/toolkit'

type Channel = { id: number, name: string }

type ChannelState = {
    count: number
    channelList: Channel[]
    loading: boolean
    error: string | null
}
const initialState: ChannelState = {
    count: 5,
    channelList: [],
    loading: false,
    error: null
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    addNum: (state, action) => {
      state.count += action.payload
    },
    setChannelList: (state, action) => {
        state.channelList += action.payload
    }
  }, 
  // 2. 异步的 action 写在 extraReducers
  extraReducers: (builder) => {
    builder
        .addCase(getChannelList.fulfilled, (state, action) => {
            console.log('true')
            state.loading = false
            state.channelList = action.payload   // payload 就是 return 的值
        })
        .addMatcher(
            isPending(getChannelList),
            (state) => {
                console.log('pending处理')
                state.loading = true
                state.error = null
        })
        .addMatcher(
            isRejected(getChannelList),
            (state, action) => {
                console.log('通用出错处理', action)
                state.loading = false
                state.error = action.error.message ?? '请求失败'
        })
  }
});

// createAsyncThunk 定义异步 thunk
export const getChannelList = createAsyncThunk(
    'counter/getChannelList',
    async () => {
        const { data } = await axios.get('https://geek.itheima.net/v1_0/channels')
        return data.data.channels   // → 成为 fulfilled 的 payload
    }
)
// 手动写thunk函数
// const { setChannelList } = counterSlice.actions
// // 异步获取数据
// const getChannelList = () => {
//     return async (dispatch: AppDispatch) => {
//         const { data } = await axios.get('https://geek.itheima.net/v1_0/channels')
//         dispatch(setChannelList(data.data.channels))
//     }
// }
// export { getChannelList }
export const { increment, decrement, addNum } = counterSlice.actions;
export default counterSlice.reducer;