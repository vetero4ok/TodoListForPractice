import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasks-reducer';

type TaskPropsType = {
    todoListID: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {

        // const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListID]
        //     .filter(t => t.id === props.todoListID)[0])
        const dispatch = useDispatch()
        // console.log('Task')

        const removeTask = () => dispatch(removeTaskAC(props.task.id, props.todoListID))
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let checked = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(props.task.id, checked, props.todoListID))
        }
        const changeTaskTitle = (title: string) =>
            dispatch(changeTaskTitleAC(props.task.id, title, props.todoListID))
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

    }
)