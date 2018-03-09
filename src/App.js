import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import {FeedProvider} from './Providers/FeedProvider'
import {MentorsProvider} from './Providers/MentorsProvider';
import Header from './components/page/header';
import Page from './components/page';
import MentorsPage from './pages/mentors';
import MentorPage from './pages/mentor';

class App extends Component {
  render() {
    return (
      <Router>
        <FeedProvider>
          <MentorsProvider>
            <Page>
              <Route exact path="/" component={MentorsPage} />
              <Route path="/mentor/:mentorId" component={MentorPage} />
            </Page>
          </MentorsProvider>
        </FeedProvider>
      </Router>
    );
  }
}

export default App;
