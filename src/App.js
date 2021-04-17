import React, { Component } from 'react';
import AppContainer from './components/AppContainer';
import MyErrorBoundary from './MyErrorBoundary'

class App extends Component {
    render() {
        return (
            <div>
                <MyErrorBoundary>
                <AppContainer/>
                </MyErrorBoundary>
            </div>

        )
    }
}

export default App;