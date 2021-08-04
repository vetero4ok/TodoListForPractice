import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
   // console.log('AddItemForm')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeAddItem = () => {
        const validation = title.trim()
        if (validation) {
            props.addItem(validation)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeAddItem()
        }
    }
    return (
        <div>

            <TextField
                label={'Title'}
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPress}
                error={error}
                helperText = {error && 'Title is required!'}
            />
            <IconButton onClick={onChangeAddItem} color = {'primary'} >
                <AddBox/>
            </IconButton>

        </div>
    );
})