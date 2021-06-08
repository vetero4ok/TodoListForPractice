import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';

type PropsTodoListType = {
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValueType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}


export const TodoList = (props: PropsTodoListType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const taskJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        const tasksIsDoneCheckbox = t.isDone ? 'isDone' : ''

        return (
            <li key={t.id} className={tasksIsDoneCheckbox}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        );
    })
    const onChangeAddTask = () => {
        const validation = title.trim()
        if (validation) {
            props.addTask(validation)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeAddTask()
        }
    }

    const onClickSetAllFilter = () => props.changeTodoListFilter('All')
    const onClickSetActiveFilter = () => props.changeTodoListFilter('Active')
    const onClickSetCompletedFilter = () => props.changeTodoListFilter('Completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                {error && <div style={{color: 'red'}}>Title is required!</div>}
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPress}
                    className={error ? 'error' : ''}
                />
                <button onClick={onChangeAddTask}>+</button>

            </div>
            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <button
                    className={props.filter === 'All' ? 'activeFilter' : ''}
                    onClick={onClickSetAllFilter}>All
                </button>
                <button
                    className={props.filter === 'Active' ? 'activeFilter' : ''}
                    onClick={onClickSetActiveFilter}>Active
                </button>
                <button
                    className={props.filter === 'Completed' ? 'activeFilter' : ''}
                    onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    );
}