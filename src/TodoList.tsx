import React, {useCallback,} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/store';
import {addTaskAC} from './State/tasks-reducer';
import {FilterValueType, TaskType} from './AppWithRedux';

type PropsTodoListType = {
    title: string
    todoListID: string
    filter: FilterValueType
    changeTodoListFilter: (filter: FilterValueType, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export const TodoList = React.memo((props: PropsTodoListType) => {
    //console.log('TodoList')
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID]);
    const dispatch = useDispatch();

    let taskForTodolist = tasks
    if (props.filter === 'Active') {
        taskForTodolist = taskForTodolist.filter(t => !t.isDone)
    }
    if (props.filter === 'Completed') {
        taskForTodolist = taskForTodolist.filter(t => t.isDone)
    }

    const addTask = (title: string) => dispatch(addTaskAC(title,props.todoListID))

    const taskJSXElement = taskForTodolist.map(t => {
        return (
            <Task
                key={t.id}
                todoListID={props.todoListID}
                task={t}
            />
        );
    })
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.todoListID), [props.todoListID, props.changeTodoListTitle])
    const deleteTodoList = () => props.removeTodoList(props.todoListID)

    const onClickSetAllFilter = useCallback(() =>
        props.changeTodoListFilter('All', props.todoListID), [props.changeTodoListFilter, props.todoListID])
    const onClickSetActiveFilter = useCallback(() =>
        props.changeTodoListFilter('Active', props.todoListID), [props.changeTodoListFilter, props.todoListID])
    const onClickSetCompletedFilter = useCallback(() =>
        props.changeTodoListFilter('Completed', props.todoListID), [props.changeTodoListFilter, props.todoListID])

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
})