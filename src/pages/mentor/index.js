import React from 'react'
import {compose, mapProps} from 'recompose'
import {withFeed} from '../../Providers/FeedProvider'
import {withMentors} from '../../Providers/MentorsProvider'
import {getMentorCommentsWithContext, getIndividualMentorActivityFromFeed} from '../../utils/mentorInsights'
import MentorPage from './MentorPage'

const enhance = compose(
  withFeed,
  withMentors,
  mapProps(({match, ...props}) => ({
    ...props,
    mentorId: match.params.mentorId
  })),
  mapProps(({feedFuture, ...props}) => ({
    ...props,
    feedFuture,
    mentor: props.mentors.find(mentor => mentor.id === props.mentorId),
    activity: !feedFuture.feed ? null : getIndividualMentorActivityFromFeed(props.mentorId, feedFuture.feed),
    comments: !feedFuture.feed ? [] : getMentorCommentsWithContext(props.mentorId, feedFuture.feed)
  })),
  mapProps(props => ({
    ...props,
    loading: !props.mentor || props.feedFuture.loading
  }))
)

export default enhance(MentorPage)
