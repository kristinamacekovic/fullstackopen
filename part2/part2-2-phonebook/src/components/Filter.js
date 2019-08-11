import React from 'react'

const Filter = props => (
  <div>
    filter shown with: <input type='text' onChange={props.handleSearch} />
  </div>
)

export { Filter }
