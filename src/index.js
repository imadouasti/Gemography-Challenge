import React from 'react';
import ReactDOM from 'react-dom';
import Elements from './components/elements'

class App extends React.Component{
    render(){
        return(
            <Elements></Elements>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));