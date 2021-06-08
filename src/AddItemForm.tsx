import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
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
            {error && <div style={{color: 'red'}}>Title is required!</div>}
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPress}
                className={error ? 'error' : ''}
            />
            <button onClick={onChangeAddItem}>+</button>

        </div>
    );
}