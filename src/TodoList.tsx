import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type PropsTodoListType = {
    title: string
    todoListID: string
    filter: FilterValueType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValueType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void


}


export const TodoList = (props: PropsTodoListType) => {

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) =>
        props.changeTodoListTitle(title, props.todoListID)
    const taskJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, t.title, props.todoListID)
        const tasksIsDoneCheckbox = t.isDone ? 'isDone' : ''

        return (
            <li key={t.id} className={tasksIsDoneCheckbox}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        );
    })

    const deleteTodoList = () => props.removeTodoList(props.todoListID)

    const onClickSetAllFilter = () => props.changeTodoListFilter('All', props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter('Active', props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter('Completed', props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={deleteTodoList}>x</button>
            </h3>
            <AddItemForm
                addItem={addTask}
            />

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