import { ReactElement } from 'react'
import styled from 'styled-components'

const FullWidth = styled.footer`
  width: 100%;
  background: #ebebeb;

  flex-shrink: 0;
  padding: 12px 64px;
`

export function Footer(): ReactElement {
  return (
    <FullWidth>
      <div>Maintained by UBC Okanagan students with ❤️</div>
    </FullWidth>
  )
}
