import { useContext } from 'react';
import { boardContext } from '../../contexts/BoardProvider';
import './style.css';

const RemoveTask = ({ columnId, itemId }) => {
    const { dispatch } = useContext(boardContext);

    const onButtonClick = () => {
        dispatch({
            type: 'REMOVE',
            payload: { columnId, itemId }
        })
    }

    return (
        <button className="browser-default remove-task-btn" onClick={onButtonClick}>
            <i className="material-icons">clear</i>
        </button>
    )
}

export default RemoveTask;