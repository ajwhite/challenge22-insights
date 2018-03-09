import React from 'react'

export default function Sentiment ({score}) {
  return (
    <span>
      {score <= -3 ? (
         '😡'
      ) : score < 0 ? (
        '😠'
      ) : score < 2 ? (
        '😶'
      ) : score < 4 ? (
        '🙂'
      ) : '😃'}
    </span>
  )
}
