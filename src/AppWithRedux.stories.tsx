import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './State/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {

};
