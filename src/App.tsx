import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'},

    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Vodka', isDone: false},
        ]
    })

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodolist: TodoListType = {
            id: newTodoListID,
            title,
            filter: 'All'
        }
        setTodoList([...todoList, newTodolist])
        setTasks({...tasks, [newTodoListID]: []})

    }

    function removeTodoList(todoListID: string) {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        const copyTask = {...tasks}
        delete copyTask[todoListID]
        setTasks(copyTask)

    }

    function removeTask(taskID: string, todoListID: string) {
        const copyTask = {...tasks}
        copyTask[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyTask)
    }

    function changeTodoListFilter(filter: FilterValueType, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTask = {...tasks}
        copyTask[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTask)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const copyTask = {...tasks}
        copyTask[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(copyTask)

    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const copyTask = {...tasks}
        copyTask[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(copyTask)

    }


    function getTodoListFilter(tl: TodoListType) {
        switch (tl.filter) {
            case 'Active':
                return tasks[tl.id].filter(t => !t.isDone)
            case 'Completed':
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]

        }

    }

    const todoListComponents = todoList.map(tl => {
        const taskForTodolist = getTodoListFilter(tl)
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}

            />
        );
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>

            {todoListComponents}
        </div>
    );
}

export default App;
