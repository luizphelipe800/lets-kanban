import { useContext, useState } from 'react';
import { boardContext } from '../../contexts/BoardProvider';
import './style.css';

const TaskInput = () => {
    const { state: { currentBoard }, dispatch } = useContext(boardContext);
    const [ content, setContent ] = useState('');

    const handleOnClick = () => {
        dispatch({ type: 'ADD', payload: { currentBoard, content }});
        setContent('');
    }

    return (
        <>
        <div id="modal1" className="modal" style={{ padding: 20, backgroundColor: '#303030' }}>
            <strong>Adicionar nova tarefa</strong>
            <textarea
                className="modal-input-task browser-default"
                onChange={e => setContent(e.target.value)}
                value={content}
            >
            </textarea>
            <button 
                onClick={handleOnClick} 
                className="modal-close modal-button-task"
            >
                Adicionar
            </button>
        </div>

        <a href="#modal1" className="modal-trigger"><i className="material-icons">add</i></a>
        </>
    )
}

export default TaskInput;