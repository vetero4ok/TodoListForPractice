import React from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC
} from './State/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const todoList = useSelector<AppRootStateType,Array<TodoListType>>(state => state.todolists)
    const dispatch =  useDispatch()


    function addTodoList(title: string) {
        dispatch(addTodolistAC(title))


    }

    function removeTodoList(todoListID: string) {
        dispatch(removeTodolistAC(todoListID))

            }

    function changeTodoListFilter(filter: FilterValueType, todoListID: string) {
        dispatch(changeTodoListFilterAC(filter, todoListID))

    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(title, todoListID))

    }

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))

    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))

    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))


    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))

    }


    function getTodoListFilter(tl: TodoListType) {
        switch (tl.filter) {
            case 'Active':
                return tasks[tl.id].filter(t => !t.isDone)
            case 'Completed':
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]

        }

    }

    const todoListComponents = todoList.map(tl => {
        const taskForTodolist = getTodoListFilter(tl)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={taskForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}

                    />
                </Paper>
            </Grid>
        );
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      style={{padding: '20px 0px'}}
                >
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container
                      spacing={5}
                >
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
