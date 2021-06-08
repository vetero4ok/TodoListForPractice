import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {
    const [filter, setFilter] = useState<FilterValueType>('All')
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    function changeTodoListFilter(filter: FilterValueType) {
        setFilter(filter)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function getTodoListFilter() {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }

    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={getTodoListFilter()}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}

            />
        </div>
    );
}

export default App;
