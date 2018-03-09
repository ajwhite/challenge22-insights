import React from 'react'
import sentiment from 'sentiment'
import * as FB from '../../utils/fb'
import {getMentorsFromFeed} from '../../utils/mentorInsights'

const FeedContext = React.createContext('feed')
const CACHE_KEY = 'feed';

function feedWithSentiments (feed) {
  return feed.map(post => ({
    ...post,
    sentiment: sentiment(post.message),
    comments: !post.comments ? null : {
      ...post.comments,
      data: post.comments.data.map(comment => ({
        ...comment,
        sentiment: sentiment(comment.message),
        comments: !comment.comments ? null : {
          ...comment.comments,
          data: comment.comments.data.map(innerComment => ({
            ...innerComment,
            sentiment: sentiment(innerComment.message)
          }))
        }
      }))
    }
  }))
}

export class FeedProvider extends React.Component {
  state = {
    feed: null,
    loading: true,
    error: null
  }

  componentDidMount() {
    let cache = localStorage.getItem(CACHE_KEY);
    if (cache) {
      this.setState({
        feed: feedWithSentiments(JSON.parse(cache)),
        loading: false
      });
    } else {
      FB.getFeed().then(({data: feed}) => {
        feed = feedWithSentiments(feed)
        this.setState({feed, loading: false})
        localStorage.setItem(CACHE_KEY, JSON.stringify(feed))
      }).catch(error => {
        this.setState({error, loading: false})
      })
    }
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
