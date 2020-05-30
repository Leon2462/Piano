import React, {Component} from 'react';
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

const PIANO = {
    height: '200px',
    margin: '100px 0 0 100px',
    position: 'fixed'
}

const SPAN = {
    margin: '0 10px 0 10px'
}
const BUTTON = {
    margin: '10px 0 0 10px'
}
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
        if (currentNote !== '' && notes.indexOf(id) !== -1) {
            this.check(id);
        }
    }

    check = (id) => {
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
    }

    success = () => {
        const {success}= this.state;
        this.setState({success: success + 1})
    }

    reset = () => {
        this.setState({success: 0})
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

        return (
            <div 
                onClick = {this.onClickHandler}
                style={PIANO}>
                {keys}
                <div>
                <button style = {BUTTON} onClick = {this.train} >Train</button>
                <span style = {SPAN}>{currentNote}</span>
                <span style = {SPAN}>{status}</span>
                </div>
                <button style = {BUTTON} onClick = {this.study} >Study</button>
                <div>
                <button style = {BUTTON} onClick = {this.reset} >Reset</button>
                <span style = {SPAN}>Число успешных попыток: {success}</span>
                </div>
            </div>
        )
    }
}

export default Piano;