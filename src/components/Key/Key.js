import React from 'react';
import './Key.css'

const Key = props => {
        const {note, onClickHandler, hide} = props;
        let keyColor = '';
        let pos;
        if ( note.indexOf('#') === -1 ) {
            keyColor = 'White'
            pos = '0px'
        }
        else {
            keyColor = 'Black'
            pos = `${-15}px`
        }
        return (
            <div
                id = {note}    
                onClick = {onClickHandler} 
                style={{marginLeft: pos,marginRight: pos}} 
                className={keyColor + 'Key'}>
                    <span  style={{position: 'absolute', top: '80%'}} >{ (hide) ? note : '' }</span>
            </div>
        )
}

export default Key;