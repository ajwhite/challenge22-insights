import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button'
import Header from './components/page/header';
import Page from './components/page';
import MentorPage from './pages/mentors';

class App extends Component {
  render() {
    return (
      <Page>
        <MentorPage />
      </Page>
      // <div className="App">
      //   <Header />
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <Button type="primary">Test</Button>
      // </div>
    );
  }
}

export default App;
