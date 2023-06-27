import React from 'react'
import "./Modal.scss"
type Props = {
    setIsOpen: Function ;
    content?: string;
    border?: "#000" | "#00f"
}

const Modal = ({setIsOpen, content, border}: Props) => {
    
    return (
        <div className='modal-body'>
            <div className="modal-container">
                <div className="modal-content">
                    {content}
                </div>
                <button className="closeBtn" onClick={() => setIsOpen(false)}>x</button>
                <button className="returnBtn" onClick={() => setIsOpen(false)}>go back</button>
            </div>
        </div>
    )
}

export default Modal