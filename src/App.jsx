import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { click, zero } from './redux/actions';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      running: false,
      elapsed: 0,
      lastTick: 0
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this)
    this.tick = this.tick.bind(this);
  }

  format(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  tick() {
    if (this.state.running) {
      const now = Date.now() + 1001;
      const diff = now - this.state.lastTick;

      this.setState({
        elapsed: this.state.elapsed + diff,
        lastTick: now
      });
    }
  }

  handleStart() {
    this.setState({
      running: true,
      lastTick: Date.now()
    });
  }

  handleStop() {
    this.setState({
      running: false,
      elapsed: 0,
      lastTick: 0,
      lastScore: this.props.counter
    });
    this.props.zero()
  }


  render() {
    console.log(this.state.elapsed)
    const time = this.format(this.state.elapsed)

    return (
      <div>
        <main>
          {this.state.elapsed > 5000 ? <div id="display">Game Over</div> : <div id="display">{time}</div>}

          {this.state.running ? <button onClick={this.state.elapsed > 5000 ? () => this.handleStop() : () => this.props.click()} disabled={this.state.elapsed > 5000 ? this.state.elapsed > 6000 ? false : true : false} id="button">{this.state.elapsed > 5000 ? 'Reset' : 'Clickr'}</button> : <button id="button-start" onClick={() => this.handleStart()}>Начать</button>}

          <div id="counter">{this.props.counter}</div>
          {!this.state.elapsed < 5000 ? <p id="last-score">Last Score: {this.state.lastScore}</p> : <p id="last-score"></p>}
        </main>
      </div>
    );
  }

}

const mapDispatchToProps = {
  click,
  zero
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    counter: state.counter,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
