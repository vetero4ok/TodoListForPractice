import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

const changeTaskStatusCallback = action('Change task Status')
const changeTaskTitleCallback = action('Change task Title')
const removeTaskCallback = action('Remove Task')

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {
        changeTaskStatusCallback,
        changeTaskTitleCallback,
        removeTaskCallback,

    },

} as ComponentMeta<typeof Task>;
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;


const args = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}


export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: '1', title: 'Redux', isDone: true},
    ...args

};
export const TaskNotIsDone = Template.bind({});
TaskNotIsDone.args = {
    task: {id: '1', title: 'Redux', isDone: false},
   ...args
};


