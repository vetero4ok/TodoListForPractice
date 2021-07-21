import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';


export type removeTodolistType = {
    type: 'REMOVE-TODOLIST',
    todoListID: string,
}
export type addTodolistType = {
    type: 'ADD-TODOLIST',
    title: string,
}
export type changeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValueType,
    todoListID: string,
}
export type changeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title:string,
    todoListID: string,
}
export type ActionType = removeTodolistType
    | addTodolistType
    | changeTodoListFilterType
    | changeTodoListTitleType
const InitialState: Array<TodoListType> = []


export const todolistsReducer = (todoList = InitialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodoListID = v1();
            const newTodolist: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'All'
            }
            return [newTodolist, ...todoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl=>tl.id=== action.todoListID ? {...tl, title: action.title}: tl)
        default:
            return todoList
    }
}
export const removeTodolistAC = (todoListID: string): removeTodolistType => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}
export const addTodolistAC = (title: string): addTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        title,
    }
}
export const changeTodoListFilterAC = (filter: FilterValueType, todoListID: string): changeTodoListFilterType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListID,
    }
}
export const changeTodoListTitleAC = (title: string, todoListID: string): changeTodoListTitleType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID,
    }
}