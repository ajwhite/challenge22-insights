import React from 'react'
import glamorous from 'glamorous'
import {Table, Row, Col} from 'antd'
import {Sparklines, SparklinesLine} from 'react-sparklines'
import * as FB from '../../utils/fb';
import Loader from '../../components/loader';
import {getMentorsFromFeed, getMentorActivityFromFeed} from '../../utils/mentorInsights';
import MentorActivityTable from './MentorActivityTable'
import {withFeed} from '../../Providers/FeedProvider'

class MentorPageContainer extends React.Component {
  state = {
    feed: null,
    mentorActivity: null,
    mentors: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.feedFuture.feed !== this.props.feedFuture.feed && this.props.feedFuture.feed) {
      let feed = this.props.feedFuture.feed;
      let mentors = getMentorsFromFeed(feed)
      let mentorActivity = getMentorActivityFromFeed(mentors, feed)

      this.setState({
        mentors,
        mentorActivity
      })
    }
  }

  render() {
    return (
      <MentorPage
        mentors={this.state.mentors}
        mentorActivity={this.state.mentorActivity}
      />
    )
  }
}

function MentorPage ({mentors, mentorActivity}) {
  return (
    <div style={{minHeight: '600px'}}>
      <h2>Mentor Activity</h2>

      {!mentorActivity ? (
        <div style={{height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Loader />
        </div>
      ) : (
        <MentorActivityTable
          mentors={mentors}
          activity={mentorActivity}
        />
      )}
    </div>
  )
}

export default withFeed(MentorPageContainer)
