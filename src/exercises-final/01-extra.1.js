// useReducer: simple Counter
import React from 'react'

function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {count: state.count + 1}
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const increment = () => dispatch({type: 'INCREMENT'})
  return <button onClick={increment}>{state.count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'useReducer: simple Counter'

export default Usage
