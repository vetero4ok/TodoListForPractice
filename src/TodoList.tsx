import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';

type PropsTodoListType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValueType) => void
}


export const TodoList = (props: PropsTodoListType) => {
    const [title, setTitle] = useState<string>('')

    const taskJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        );
    })
    const onChangeAddTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)
    const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
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
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPress}

                />
                <button onClick={onChangeAddTask}>+</button>
            </div>
            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <button onClick={onClickSetAllFilter}>All</button>
                <button onClick={onClickSetActiveFilter}>Active</button>
                <button onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    );
}