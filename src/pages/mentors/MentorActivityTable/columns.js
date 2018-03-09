import React from 'react';
import {Sparklines, SparklinesLine} from 'react-sparklines'

const columns = [
  {
    title: 'Mentor',
    dataIndex: 'name',
    render: (text, {mentor}) => (
      <div>
        {mentor.avatar && <img src={mentor.avatar} style={{marginRight: 8}} />}
        {mentor.name}
      </div>
    ),
    sorter: (a, b) => a.mentor.name - b.mentor.name
  },
  {
    title: 'Posts',
    dataIndex: 'posts',
    sorter: (a, b) => a.posts - b.posts
  },
  {
    title: 'Comments',
    dataIndex: 'comments',
    sorter: (a, b) => a.comments - b.comments
  },
  {
    title: 'Threads',
    dataIndex: 'threads',
    sorter: (a, b) => a.threads - b.threads
  },
  {
    title: 'Discussions',
    dataIndex: 'discussions',
    sorter: (a, b) => a.discussions - b.discussions,
    render: (text, {discussions}) => discussions || `-`
  },
  {
    title: 'Activity',
    dataIndex: 'activity',
    render: (text, {activityByDay}) => {
      return (
        <Sparklines data={activityByDay} limit={30} width={100} height={20}>
          <SparklinesLine color="blue" />
        </Sparklines>
      )
    }
  },
  {
    title: 'Last seen',
    dataIndex: 'lastSeen',
    sorter: (a, b) => a.lastSeen - b.lastSeen,
    render: (text, {lastSeen}) => (
      <span>
        {lastSeen.fromNow()}
      </span>
    )
  }
];

export default columns;
