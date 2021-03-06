import {TasksStateType, TaskType} from '../App';
import {v1} from 'uuid';
import {addTodolistType, removeTodolistType} from './todolists-reducer';


export type removeTaskType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string

}
export type addTaskType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type changeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string
    title: string
    todoListID: string

}
export type ActionType = removeTaskType
    | addTaskType
    | changeTaskStatusType
    | changeTaskTitleType
    | addTodolistType
    | removeTodolistType
const InitialState: TasksStateType = {}


export const tasksReducer = (state = InitialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .filter(t => t.id !== action.taskID)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListID]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        default:
            return state
    }
}
export const removeTaskAC = (taskID: string, todoListID: string): removeTaskType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID,
    }
}
export const addTaskAC = (title: string, todoListID: string): addTaskType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListID
    }
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        isDone,
        todoListID,
    }
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID,
        title,
        todoListID,
    }
}

