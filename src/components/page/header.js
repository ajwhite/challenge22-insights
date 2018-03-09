import React from 'react'
import glamorous from 'glamorous'
import {Layout} from 'antd'
import Row from '../layout/row';

export default function Header (props) {
  return (
    <Container>
      <Row>
        <Logo src="https://www.challenge22.com/wp-content/uploads/2017/06/challenge22-logo.png" />
        <Title>Challenge Group Management</Title>
      </Row>
    </Container>
  )
}

const Container = glamorous(Layout.Header)({
  height: 'auto',
  paddingTop: 20,
  paddingBottom: 20
})

const Logo = glamorous.img({
  height: 100
})

const Title = glamorous.h1({
  color: '#fff',
  marginLeft: 40,

})
