import Moment from 'moment'
import {extendMoment} from 'moment-range'
import _ from 'lodash'
const moment = extendMoment(Moment)

const createIdMapOf = (ids, initialValue) => ids.reduce((map, id) => {
  map[id] = initialValue();
  return map;
}, {})

export function getIndividualMentorActivityFromFeed (mentorId, feed) {
  let activity = getMentorActivityFromFeed([{id: mentorId}], feed);

  return Object.keys(activity).reduce((map, type) => {
    map[type] = activity[type][mentorId]
    return map;
  }, {})
}

export function getMentorActivityFromFeed (mentors, feed) {
  const ids = mentors.map(mentor => mentor.id);

  return feed.reduce((activity, post) => {
    let postAuthor = post.from.id;
    let postDate = moment(post.created_time)
    let involvedInThread = {};

    // have they had a discussion? how many comments by each user
    let discussionComments = createIdMapOf(ids, () => 0);


    const activityDates = createIdMapOf(ids, () => []);



    if (ids.indexOf(postAuthor) > -1) {
      activity.posts[postAuthor].push(post.id)
      involvedInThread[postAuthor] = true;

      if (!activity.lastSeen[postAuthor] || activity.lastSeen[postAuthor].isBefore(postDate)) {
        activity.lastSeen[postAuthor] = postDate;
      }

      activityDates[postAuthor].push(postDate)
    }

    if (post.comments) {
      for (let i = 0; i < post.comments.data.length; i++) {
        let comment = post.comments.data[i]
        let commentDate = moment(comment.created_time);
        let commentAuthor = comment.from.id;

        if (ids.indexOf(commentAuthor) > -1) {
          activity.comments[commentAuthor].push(comment.id)
          involvedInThread[commentAuthor] = true;
          discussionComments[commentAuthor]++
          activityDates[commentAuthor].push(commentDate);

          if (!activity.lastSeen[commentAuthor] || activity.lastSeen[commentAuthor].isBefore(commentDate)) {
            activity.lastSeen[commentAuthor] = commentDate;
          }

          if (comment.comments) {
            for (let j = 0; j < comment.comments.data.length; j++) {
              let commentOfComment = comment.comments.data[j];
              let commentOfCommentAuthor = commentOfComment.from.id;
              let commentOfCommentDate = moment(commentOfComment.created_time)

              if (ids.indexOf(commentOfCommentAuthor) > -1) {
                let wtf = activity.comments[commentOfCommentAuthor]
                activity.comments[commentOfCommentAuthor].push(commentOfComment.id)
                involvedInThread[commentOfCommentAuthor] = true
                discussionComments[commentOfCommentAuthor]++
                activityDates[commentOfCommentAuthor].push(commentOfCommentDate)

                if (!activity.lastSeen[commentOfCommentAuthor] || activity.lastSeen[commentOfCommentAuthor].isBefore(commentOfCommentDate)) {
                  activity.lastSeen[commentOfCommentAuthor] = commentOfCommentDate;
                }
              }
            }
          }
        }
      }
    }

    Object.keys(involvedInThread).forEach(id => {
      activity.threads[id].push(post.id)
    })

    Object.keys(discussionComments).forEach(id => {
      let discussions = discussionComments[id];
      let DISCUSSION_COMMENT_THRESHOLD = 3;
      if (discussions > DISCUSSION_COMMENT_THRESHOLD) {
        activity.discussions[id]++;
      }
    })

    Object.keys(activityDates).forEach(id => {
      let dates = activityDates[id]

      dates.forEach(date => {
        activity.activityByDay[id].forEach(record => {
          if (record.date.isSame(date, 'day')) {
            record.count++;
          }
        })
      })
    })

    return activity;
  }, {
    comments: createIdMapOf(ids, () => []),
    posts: createIdMapOf(ids, () => []),
    threads: createIdMapOf(ids, () => []),
    discussions: createIdMapOf(ids, () => []),
    lastSeen: createIdMapOf(ids, () => null),
    activityByDay: createIdMapOf(ids, () => Array.from(moment.range(moment().startOf('month'), moment().endOf('month')).by('day')).map(date => ({
      date,
      count: 0
    })))
  })
}

const toUser = user => ({
  id: user.id,
  name: user.name,
  avatar: user.picture ? user.picture.data.url : null
})

export function getMentorsFromFeed (feed) {
  const mentorMap = feed.reduce((map, post) => {
    if (post.message && post.message.includes('[Mentor]')) {
      map[post.from.id] = toUser(post.from);
    }
    if (post.comments) {
      post.comments.data.forEach(comment => {
        if (comment.message && comment.message.includes('[Mentor]')) {
          map[comment.from.id] = toUser(comment.from)
        }
      })
    }

    return map;
  }, {})

  return Object.values(mentorMap)
}

export function getMentorCommentsWithContext(mentorId, feed) {
  const mentorComments = [];

  for (let i = 0; i < feed.length; i++) {
    let post = feed[i]
    let comments = post.comments ? post.comments.data : []

    for (let j = 0; j < comments.length; j++) {
      let comment = comments[j]
      let commentAuthor = comment.from.id;

      if (commentAuthor === mentorId) {
        let context = j === 0 ? post : comments[j - 1];
        mentorComments.push({context, comment})
      }

      let commentComments = comment.comments ? comment.comments.data : []

      for (let k = 0; k < commentComments.length; k++) {
        let commentComment = commentComments[k]
        let commentCommentAuthor = commentComment.from.id

        if (commentCommentAuthor === mentorId) {
          let context = k === 0 ? comment : commentComments[k - 1]
          mentorComments.push({context, comment})
        }
      }
    }
  }

  return mentorComments;
}
