import React from 'react'
import * as FB from '../../utils/fb'
import {getMentorsFromFeed} from '../../utils/mentorInsights'

const FeedContext = React.createContext('feed')

export class FeedProvider extends React.Component {
  state = {
    feed: null,
    loading: true,
    error: null
  }

  componentDidMount() {
    FB.getFeed().then(({data: feed}) => {
      this.setState({feed, loading: false})
    }).catch(error => {
      this.setState({error, loading: false})
    })
  }

  render() {
    return (
      <FeedContext.Provider value={this.state}>
        {this.props.children}
      </FeedContext.Provider>
    )
  }
}

export function withFeed(WrappedComponent) {
  return function WrappedComponentWithFeed(props) {
    return (
      <FeedContext.Consumer>
        {feed => <WrappedComponent {...props} feedFuture={feed} />}
      </FeedContext.Consumer>
    )
  }
}

export default FeedContext;
