import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAnecdote: ''
        }
    }

    handleAnecdoteFieldChange = (event) => {
        this.setState({ newAnecdote: event.target.value})
    }

    handleNewAnecdoteSubmit = (event) => {
        event.preventDefault()
        this.props.store.dispatch({
            type: 'NEW_ANECDOTE',
            data: { anecdote: this.state.newAnecdote }
        })
        this.setState({newAnecdote: ''})
    }
  
    render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => { return (b.votes - a.votes)}).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id, this.props.store)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div>
              <input type="text"
                name="anecdote"
                value={this.state.newAnecdote}
                onChange={this.handleAnecdoteFieldChange}/>
          </div>
          <button onClick={this.handleNewAnecdoteSubmit}>create</button> 
        </form>
      </div>
    )
  }

  vote = (id, store) => () => {
      store.dispatch({
          type: 'VOTE',
          data: { id }
      })
  }
}

export default App