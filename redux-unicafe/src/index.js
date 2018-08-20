import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from '../node_modules/redux'
//import counterReducer from '../components/reducer'
import counterReducer from './components/reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteita = store.getState().good + store.getState().ok + store.getState().bad
  console.log('palautteita:', palautteita)
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
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
            <td>{countAvg()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{countPositives()}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

const countAvg = () => {
    return (
      ((store.getState().good * 1.0 + store.getState().ok * 0.0 + store.getState().bad * -1.0) / 
      (store.getState().good + store.getState().ok + store.getState().bad)).toFixed(1)
   )
}

const countPositives = () => {
    return ((100.0 * (store.getState().good) / (store.getState().good + store.getState().ok + store.getState().bad)).toFixed(1).toString() + ' %')
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi.toString() })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)
StorageEvent
