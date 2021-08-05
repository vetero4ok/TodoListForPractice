import React, {useCallback} from 'react';
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
    // console.log('AppWithRedux')
    const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch()


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValueType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filter, todoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])


    const todoListComponents = todoList.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        changeTodoListFilter={changeTodoListFilter}
                        removeTodoList={removeTodoList}
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
