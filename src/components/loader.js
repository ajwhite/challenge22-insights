import React from 'react'
import glamorous from 'glamorous'

export default function Loader ({size, ...props}) {
  return (
    <div {...props} className="loader">
      <span size={size} />
      <span size={size} />
      <span size={size} />
    </div>
  )
}

const Dot = glamorous.span(size => ({
  width: size,
  height: size
}))
