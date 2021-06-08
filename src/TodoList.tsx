import React from 'react';
import {FilterValueType, TaskType} from './App';

type PropsTodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID: number) =>void
    changeTodoListFilter:(filter:FilterValueType)=>void
}


export const TodoList = (props: PropsTodoListType) => {
    const taskJSXElement = props.tasks.map(t => {
        const removeTask = ()=>props.removeTask(t.id)
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask} >x</button>
            </li>
        );
    })

    const onClickSetAllFilter = ()=>props.changeTodoListFilter('All')
    const onClickSetActiveFilter = ()=>props.changeTodoListFilter('Active')
    const onClickSetCompletedFilter = ()=>props.changeTodoListFilter('Completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <button onClick={onClickSetAllFilter} >All</button>
                <button onClick={onClickSetActiveFilter} >Active</button>
                <button onClick={onClickSetCompletedFilter} >Completed</button>
            </div>
        </div>
    );
}