import React from 'react'
import glamorous from 'glamorous'
import {Table, Row, Col} from 'antd'
import {Sparklines, SparklinesLine} from 'react-sparklines'
import * as FB from '../../utils/fb';
import Loader from '../../components/loader';
import {getMentorsFromFeed, getMentorActivityFromFeed} from '../../utils/mentorInsights';
import MentorActivityTable from './MentorActivityTable'

export default class MentorPageContainer extends React.Component {
  state = {
    feed: null,
    mentorActivity: null,
    mentors: []
  }

  componentDidMount() {
    FB.getFeed().then(resp => {
      let feed = resp.data;

      let mentors = getMentorsFromFeed(feed)
      console.log('feed size', feed.length)
      this.setState({
        mentors,
        feed,
        mentorActivity: getMentorActivityFromFeed(mentors, feed)
      });
    })
  }
  render() {
    console.log('state', this.state)
    return (
      <MentorPage
        mentors={this.state.mentors}
        feed={this.state.feed}
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
