import React, { Component } from "react";
import "./styles.css";
import img0 from "../../assets/images/0.jpg";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import img5 from "../../assets/images/5.jpg";
import img6 from "../../assets/images/6.jpg";
import {randomWord} from "../../assets/data/words.js";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    const isGameOver = this.isGameOver();
    return this.state.answer
      .split("")
      .map(ltr => (isGameOver || this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** handleGuest: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  handleRestart(evt) {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord() });
  }

  /** isGameOver: indicates if the player lost the game */
  isGameOver(){
    return this.props.maxWrong === this.state.nWrong;
  }

  /** didPlayerWin: indicates if the player has won */
  didPlayerWin(){
    return this.guessedWord().join('') === this.state.answer;
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    if(this.isGameOver()){
      return <h3>You lose!</h3>;
    } else if(this.didPlayerWin()) {
      return <h2>You won!</h2>;
    } else {
      return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button
          key={ltr}
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
        >
          {ltr}
        </button>
      ));
    }
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={this.props.nWrong + ' wrong guesses”'} />
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <h5>Number wrong: {this.state.nWrong}</h5>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
        <button id='reset' onClick={this.handleRestart}>Reset?</button>
      </div>
    )
  }
}

export default Hangman;
