import React from 'react'
import {getMentorsFromFeed} from '../../utils/mentorInsights'
import {withFeed} from '../FeedProvider'

const MentorsContext = React.createContext('mentors')

class MentorsProviderImpl extends React.Component {
  state = {
    mentors: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.feedFuture.feed !== this.props.feedFuture.feed && this.props.feedFuture.feed) {
      this.setState({
        mentors: getMentorsFromFeed(this.props.feedFuture.feed)
      })
    }
  }

  render() {
    return (
      <MentorsContext.Provider value={this.state.mentors}>
        {this.props.children}
      </MentorsContext.Provider>
    )
  }
}

export const MentorsProvider = withFeed(MentorsProviderImpl)

export function withMentors(WrappedComponent) {
  return function WrappedComponentWithMentors(props) {
    return (
      <MentorsContext.Consumer>
        {mentors => <WrappedComponent {...props} mentors={mentors} />}
      </MentorsContext.Consumer>
    )
  }
}
