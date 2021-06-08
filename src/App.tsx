import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}
export type FilterValueType = 'All'|'Active'|'Completed'

function App() {
    const [filter, setFilter]  = useState<FilterValueType>('All')
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false},
        {id: 5, title: 'Redux', isDone: false},
    ])

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    function changeTodoListFilter(filter:FilterValueType) {
        setFilter(filter)
    }

    function getTodoListFilter() {
        switch (filter) {
            case 'Active':
                return tasks.filter(t=>!t.isDone)
            case 'Completed':
                return tasks.filter(t=>t.isDone)
            default:
                return tasks

        }

    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={getTodoListFilter()}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}

            />
        </div>
    );
}

export default App;
