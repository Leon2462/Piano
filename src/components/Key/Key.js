import React from 'react';

const BLACKKEY = {
    float:'left',
    width: '50px',
    height: '150px',
    background: 'black',
    color: 'white',
    position: 'relative',
    lineHeight: '180px'
}

const WHITEKEY = {
    float:'left',
    width: '60px',
    height: '300px',
    background: 'whitesmoke',
    border: '1px solid black',
    lineHeight: '380px'
}

const Key = props => {
        const {note, onClickHandler, hide} = props;
        let keyColor = '';
        let pos;
        if ( note.indexOf('#') === -1 ) {
            keyColor = WHITEKEY
            pos = '0px'
        }
        else {
            keyColor =BLACKKEY
            pos = `${-25}px`
        }
        const key = {
            marginLeft: pos,
            marginRight: pos,
            textAlign: 'center',
        }
        return (
            <div
                id = {note}    
                onClick = {onClickHandler} 
                style={Object.assign(key,keyColor)}> 
                    <span 
                    id = {note} 
                    onClick = {onClickHandler}>

                       { (hide) ? note : '' }
                       
                    </span>
            </div>
        )
}

export default Key;