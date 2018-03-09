import React from 'react'
import glamorous from 'glamorous'
import {Table, Row, Col} from 'antd'
import {Sparklines, SparklinesLine} from 'react-sparklines'
import * as FB from '../../utils/fb';
import Loader from '../../components/loader';
import {getMentorsFromFeed, getMentorActivityFromFeed} from '../../utils/mentorInsights';
import MentorActivityTable from './MentorActivityTable'
import {withFeed} from '../../Providers/FeedProvider'
import {withMentors} from '../../Providers/MentorsProvider'

class MentorPageContainer extends React.Component {
  state = {
    mentorActivity: null
  }

  componentDidUpdate(prevProps) {
    if (
      (
        prevProps.feedFuture.feed !== this.props.feedFuture.feed ||
        prevProps.mentors !== this.props.mentors
      ) &&
      this.props.feedFuture.feed && this.props.mentors.length > 0
    ) {
    // if (prevProps.feedFuture.feed !== this.props.feedFuture.feed && this.props.feedFuture.feed) {
      let feed = this.props.feedFuture.feed;
      let mentorActivity = getMentorActivityFromFeed(this.props.mentors, feed)

      this.setState({
        mentorActivity
      })
    }
  }

  render() {
    console.log('MentorPage', {
      state: this.state,
      props: this.props
    })
    return (
      <MentorPage
        mentors={this.props.mentors}
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

export default withFeed(withMentors(MentorPageContainer))
