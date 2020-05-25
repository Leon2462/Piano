import React, {Component} from 'react';
import './Piano.css';
import Key from '../Key/Key'

const sounds = [
    new Audio('https://piano-tuning.ru/audio/sounds/piano_C.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_C+.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_D.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_D+.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_E.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_F.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_F+.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_G.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_G+.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_A.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_A+.mp3'),
    new Audio('https://piano-tuning.ru/audio/sounds/piano_B.mp3')
];

class Piano extends Component {
    constructor(props){
        super(props)
        this.state = {
            notes: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
            currentNote : '',
            status: '',
            showNotes: false,
            success: 0
        }
    }

    onClickHandler = (event) => {
        const { notes, currentNote } = this.state;
        const { id } = event.target;
        for ( let i = 0; i < notes.length; i++ ) {
            if (id === notes[i]) {
                sounds[i].play()
                setTimeout(()=>{ sounds[i].load() }, 2000)
            }
        }
        if (currentNote !== '') {
            this.check(id);
        }
    }

    check = (id) => {
        console.log(id)
        const {currentNote} = this.state;
        if (id === currentNote) {
            this.setState({status: 'Верно'})
            this.success();
        }   
        else {
            this.setState({status: 'Неверно'})
        }
        this.clean();

    }

    clean = () => {
        setTimeout(()=>{ this.setState({status: '', currentNote: ''})} , 2000)
    }
    
    train = () => {
        const { notes } = this.state;
        const i = Math.floor(Math.random() * (11 - 0 + 1)) + 0;
        this.setState({currentNote: notes[i]})
        sounds[i].play();
        setTimeout(()=>{ sounds[i].load() }, 2000)
    }

    study = () => {
        const {showNotes} = this.state;
        this.setState({showNotes: !showNotes})
        console.log(this.state.showNotes)
    }

    success = () => {
        const {success}= this.state;
        this.setState({success: success + 1})
    }

    render() {
        const {notes, currentNote,status, showNotes,success} = this.state;
        const keys = [];
        for (let i = 0; i < notes.length;i++ ){
            keys.push(<Key  
                key = {`${i}`} 
                note = {notes[i]}
                onClick = {this.onClickHandler}
                hide = {showNotes}
                />)
        }

        return(
            <div 
                onClick = {this.onClickHandler}
                className='Piano'>
                {keys}
                <button onClick = {this.train} >Train</button>
                <button onClick = {this.study} >Study</button>
                <span>{currentNote}</span>
                <span>{status}</span>
                <span style={{display:'inline-block'}}>Число успешных попыток: {success}</span>
            </div>
        )
    }
}

export default Piano;