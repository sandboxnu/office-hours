import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../styles/global.css'
import { Footer } from '../components/common/Footer'
import styled from 'styled-components'
import { ReactElement } from 'react'
import { ErrorBoundary } from '../components/common/ErrorBoundary'
import { ChatbotContextProvider } from '../providers/chatbotProvider'
import * as Sentry from '@sentry/node'

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: 'https://9cfb47804c93495ba3a66a9d79cec084@o440615.ingest.sentry.io/5557379',
    tracesSampleRate: 0.2,
  })
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChatbotContextProvider>
      <Layout>
        <Content>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Content>
        <Footer />
      </Layout>
    </ChatbotContextProvider>
  )
}

export default MyApp
