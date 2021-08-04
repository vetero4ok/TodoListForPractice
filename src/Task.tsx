import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';

type TaskPropsType = {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    // console.log('Task')
    const removeTask = () => props.removeTask(props.task.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    const changeTaskTitle = useCallback((title: string) =>
        props.changeTaskTitle(props.task.id, title), [props.changeTaskTitle, props.task.id,])
    const tasksIsDoneCheckbox = props.task.isDone ? 'isDone' : ''

    return (
        <li key={props.task.id}>
                <span className={tasksIsDoneCheckbox}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        checked={props.task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                </span>
            <IconButton onClick={removeTask} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
    );

})