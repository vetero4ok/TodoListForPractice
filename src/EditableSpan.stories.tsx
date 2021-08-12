import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    args: {

    }


} as ComponentMeta<typeof EditableSpan>;
const Template: ComponentStory<typeof EditableSpan> = (args) => {

    return <EditableSpan {...args} />;
}

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title: 'Editable Span ',
    changeTitle:action('Changing Title')
};
