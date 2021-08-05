import React from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/store';
import {addTaskAC} from './State/tasks-reducer';
import {TaskType, TodoListType} from './AppWithRedux';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodolistAC} from './State/todolists-reducer';

type TodoListPropsType = {
    todoListID: string
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    //console.log('TodoList')
    const todoList = useSelector<AppRootStateType, TodoListType>(state =>
        state.todolists.filter(tl => tl.id === props.todoListID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID]);
    const dispatch = useDispatch();

    let taskForTodolist = tasks
    if (todoList.filter === 'Active') {
        taskForTodolist = taskForTodolist.filter(t => !t.isDone)
    }
    if (todoList.filter === 'Completed') {
        taskForTodolist = taskForTodolist.filter(t => t.isDone)
    }

    const addTask = (title: string) => dispatch(addTaskAC(title, props.todoListID))

    const taskJSXElement = taskForTodolist.map(t => {
        return (
            <Task
                key={t.id}
                todoListID={props.todoListID}
                task={t}
            />
        );
    })
    const changeTodoListTitle = (title: string) => dispatch(changeTodoListTitleAC(title, props.todoListID))
    const removeTodoList = () => dispatch(removeTodolistAC(props.todoListID))
    const onClickSetAllFilter = () => dispatch(changeTodoListFilterAC('All', props.todoListID))
    const onClickSetActiveFilter = () => dispatch(changeTodoListFilterAC('Active', props.todoListID))
    const onClickSetCompletedFilter = () => dispatch(changeTodoListFilterAC('Completed', props.todoListID))

    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size={'small'}>
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
                    variant={todoList.filter === 'All' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    variant={todoList.filter === 'Active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    variant={todoList.filter === 'Completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
})