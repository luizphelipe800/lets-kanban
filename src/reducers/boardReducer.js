import uuid from 'uuid/v4';

export const boardInitialState = {
    column01: {
        name: 'Fazer',
        items: []
    },
    column02: {
        name: 'Fazendo',
        items: []
    },
    column03: {
        name: 'Aprovando',
        items: []
    },
    column04: {
        name: 'Feito',
        items: []
    }
}

export const boardReducer = (state, action) => {
    if(action.type === 'ADD'){
        return (
            {
                ...state,
                column01: {
                    ...state.column01,
                    items: [ ...state.column01.items, { id: uuid(), content: action.payload.content }]
                }
            }
        )
    }

    if(action.type === 'CHANGE'){
        return state = { ...action.payload }
    }

    return state;
}