import React from 'react';


class App extends React.Component {
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
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
          <div><input /></div>
          <button>create</button> 
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