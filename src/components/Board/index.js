import { useContext } from 'react';
import { boardContext } from '../../contexts/BoardProvider';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TaskInput from '../TaskInput';
import RemoveTask from '../RemoveTask';
import './style.css';

const onDragEnd = (result, columns, dispatch) => {
    const { source, destination } = result;

    if(!destination) return;

    if(source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        dispatch({
            type: 'CHANGE',
            payload: {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: [...sourceItems]
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: [...destItems]
                }
            }
        });

    }else{
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        dispatch({
            type: 'CHANGE',
            payload: {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: [...copiedItems]
                }
            }
        })
    }
}

const Board = () => {
    const { state: columns, dispatch } = useContext(boardContext);

    return (
        <div className="board-container">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, dispatch)}>
            {Object.entries(columns).map(([id, column]) => (
                <div key={id} className="board-columns">
                <div className="column-header">
                    <strong>{ column.name }</strong>
                    {
                        column.name === 'Fazer' ?
                        <TaskInput/> :
                        <></> 
                    }
                </div>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div
                            { ...provided.droppableProps }
                            ref={provided.innerRef}
                            style={{
                                backgroundColor: snapshot.isDraggingOver ? '#404040' : '#303030',
                                padding: 4,
                                width: 250,
                                minHeight: 400
                            }}
                        >
                            {column.items.map((item, index) => (
                                <Draggable draggableId={item.id} key={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            { ...provided.draggableProps }
                                            { ...provided.dragHandleProps }
                                            ref={ provided.innerRef }
                                            style={{
                                                userSelect: 'none',
                                                margin: '0 0 8px 0',
                                                minHeight: '50px',
                                                backgroundColor: snapshot.isDragging ? '#2D89AB' : '#3BAFDA',
                                                color: '#232323',
                                                ...provided.draggableProps.style
                                            }}
                                            className="card"
                                        >
                                            <div className="card-content">
                                                { item.content }
                                            </div>
                                            <div className="card-action">
                                                <RemoveTask columnId={id} itemId={item.id}/>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            ))}
        </DragDropContext>
        </div>
    );
}

export default Board;