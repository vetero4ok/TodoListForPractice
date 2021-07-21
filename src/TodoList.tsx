import React, {ChangeEvent,} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@material-ui/core/Button';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
            <li key={t.id}>
                <span className={tasksIsDoneCheckbox}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask} size={'small'}>
                    <Delete/>
                </IconButton>
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
                <IconButton onClick={deleteTodoList} size={'small'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />

            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <Button
                    size={'small'}
                    variant={props.filter === 'All' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
}