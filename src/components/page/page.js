import React from 'react'
import {Layout} from 'antd'
import glamorous from 'glamorous'
import Header from './header';
// const {Header, Footer, Content} = Layout;

export default function Page ({children, ...props}) {
  return (
    <Layout>
      <Header />
      <Layout.Content style={{margin: 40, height: '100%'}}>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Layout.Content>
    </Layout>
  )
}

const ContentContainer = glamorous.div({
  maxWidth: 1200,
  margin: 'auto'
})
