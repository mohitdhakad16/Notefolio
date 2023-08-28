import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Alert = () => {
    const context = useContext(noteContext); // using the context API which we created in noteContext
    const { alert } = context;  

    const captilize = (word) => {
        if(word === 'danger'){
            word = 'Error';
        }
        
        let newText = word.toLowerCase();
        return newText.charAt(0).toUpperCase() + newText.slice(1)
    }
    return (
        <div style={{ height: '50px' }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{captilize(alert.type)}: </strong>{alert.msg}
            </div>}
        </div>
    )
}

export default Alert
