import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    console.log(this.props);
  }
  render() {
    console.log(this.props)
    return (
      <div>khdaadd</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))