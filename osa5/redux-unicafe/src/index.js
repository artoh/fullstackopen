import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'


const store = createStore( counterReducer )


const Statistiikka = () => {
  const palautteita = store.getState().good + store.getState().ok + store.getState().bad

  console.log( palautteita, store)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{ Math.round( (store.getState().good * 1 + store.getState().bad * -1) / palautteita*10) / 10}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{"" + Math.round((store.getState().good * 100 / (palautteita)) * 10) / 10 + " %"}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type : 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {

  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={ e => store.dispatch({type : 'GOOD'})}>hyvä</button>
        <button onClick={ e => store.dispatch({type : 'OK'})}>neutraali</button>
        <button onClick={ e => store.dispatch({type : 'BAD'})}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

ReactDOM.render(<App />, document.getElementById('root'));
store.subscribe( renderApp )
