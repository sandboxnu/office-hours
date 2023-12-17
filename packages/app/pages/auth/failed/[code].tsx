import { Typography, Result, Spin, Button } from 'antd'
import Head from 'next/head'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

const { Paragraph, Text } = Typography

const FAILED_CODES = {
  40000: 'Organization not found',
  40001: 'Malformed request',
  40002: "Organization doesn't support SSO",
}

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-top: 100px;
  width: 60%;
  border-radius: 15px;
  height: auto;

  @media (max-width: 650px) {
    width: 90%;
  }

  @media (max-width: 992px) {
    width: 80%;
  }
`

export default function AuthFailedCode(): ReactElement {
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if (code && !FAILED_CODES[Number(code)]) {
      router.push('/')
    }
  }, [code, router])

  return code && FAILED_CODES[Number(code)] ? (
    <>
      <Head>
        <title>UBC Login Failed</title>
      </Head>
      <Container>
        <Result
          status="error"
          title="Authentication Failed"
          extra={[
            <Button
              type="primary"
              className="m-auto h-auto w-2/5 items-center justify-center rounded-lg border px-5 py-3"
              key="login"
              onClick={() => router.push('/login')}
            >
              Go to Login Page
            </Button>,
          ]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                The content you submitted has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
              {FAILED_CODES[Number(code)]}
            </Paragraph>
          </div>
        </Result>
      </Container>
    </>
  ) : (
    <Spin />
  )
}
