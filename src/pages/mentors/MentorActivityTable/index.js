import React from 'react'
import {Table} from 'antd'
import {compose, mapProps, withProps} from 'recompose'
import columns from './columns';

const enhance = compose(
  withProps({
    columns,
    pagination: {pageSize: 200}
  }),
  mapProps(({mentors, activity, ...props}) => ({
    ...props,
    dataSource: mentors.map(mentor => ({
      mentor,
      posts: activity.posts[mentor.id].length,
      threads: activity.threads[mentor.id].length,
      comments: activity.comments[mentor.id].length,
      discussions: activity.discussions[mentor.id],
      activityByDay: activity.activityByDay[mentor.id].map(item => item.count),
      lastSeen: activity.lastSeen[mentor.id],
    }))
  }))
);

const MentorActivityTable = enhance(Table);

export default MentorActivityTable;
