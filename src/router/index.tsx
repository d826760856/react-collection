import { createBrowserRouter } from "react-router-dom";
import ContainBox from '@/pages'

import Todo_props from '@/pages/todo_props'
import Todo_context from '@/pages/todo_context'
import Todo_redux from '@/pages/todo_redux'

import Counter_redux from '@/pages/counter/redux'
import Counter_useReducer from "@/pages/counter/useReducer";
import Counter_zustand from "@/pages/counter/zustand";

import Bill_App from "@/pages/BillApp_context"
import Bill_edit from "@/pages/BillApp_context/Bill_edit/Bill_edit";
import Bill_gatway from "@/pages/BillApp_context/Bill_gatway/Bill_gatway";
import Bill_month from "@/pages/BillApp_context/Bill_gatway/Bill_month/Bill_month";
import Bill_year from "@/pages/BillApp_context/Bill_gatway/Bill_year/Bill_year";

const router = createBrowserRouter([
    { path: '', element: <ContainBox></ContainBox>, children: [
        { index: true, element: <Todo_props></Todo_props> },
        { path: 'todo_props', element: <Todo_props></Todo_props> },
        { path: 'todo_context', element: <Todo_context></Todo_context> },
        { path: 'todo_redux', element: <Todo_redux></Todo_redux> },
        { path: 'counter_redux', element: <Counter_redux></Counter_redux> },
        { path: 'counter_useReducer', element: <Counter_useReducer></Counter_useReducer> },
        { path: 'counter_zustand', element: <Counter_zustand></Counter_zustand> },
        { path: 'bill_context', element: <Bill_App></Bill_App>, children: [
            { index: true, element: <Bill_gatway></Bill_gatway> },
            { path: 'edit', element: <Bill_edit></Bill_edit> },
            { path: 'gatway', element: <Bill_gatway></Bill_gatway>, children: [
                    { index: true, element: <Bill_month></Bill_month> },
                    { path: 'month', element: <Bill_month></Bill_month> },
                    { path: 'year', element: <Bill_year></Bill_year> },
                ]
            }
        ]},
    ]},
])

export default router