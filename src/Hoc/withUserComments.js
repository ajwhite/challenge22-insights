import React from 'react'
import {compose, mapProps} from 'recompose'
import {withFeed} from '../Providers/FeedProvider'
import {getMentorCommentsWithContext} from '../utils/mentorInsights'

const withUserComments = mentorId => compose(
  withFeed,
  mapProps(({feedFuture, ...props}) => ({
    comments: !feedFuture.feed ? [] : getMentorCommentsWithContext(mentorId, feedFuture.feed)
  }))
);

export default withUserComments;
