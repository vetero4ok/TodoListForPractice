import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasks-reducer';
import {TaskType} from './AppWithRedux';
import {AppRootStateType} from './State/store';

type TaskPropsType = {
    taskID: string
    todoListID: string
}

export const Task = React.memo((props: TaskPropsType) => {
        // console.log('Task')

        const task = useSelector<AppRootStateType, TaskType>(state =>
            state.tasks[props.todoListID].filter(t => t.id === props.taskID)[0])
        const dispatch = useDispatch()

        const removeTask = () => dispatch(removeTaskAC(props.taskID, props.todoListID))
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let checked = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(props.taskID, checked, props.todoListID))
        }
        const changeTaskTitle = (title: string) =>
            dispatch(changeTaskTitleAC(props.taskID, title, props.todoListID))
        const tasksIsDoneCheckbox = task.isDone ? 'isDone' : ''

        return (
            <li key={task.id}>
                <span className={tasksIsDoneCheckbox}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
        );

    }
)