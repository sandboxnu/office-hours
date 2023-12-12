import { ReactElement } from 'react'
import styled from 'styled-components'

const BAR_WIDTH_PX = 10
const BAR_HEIGHT_PX = 50

/**
 * Renders a vertical bar that shows the hotness of a question.
 * @param hotness a number between 0 (least hot) to 100 (most hot)
 */
export default function HotnessBar({
  hotness,
}: {
  hotness: number
}): ReactElement {
  return (
    <EmptyBar>
      <Fill hotness={hotness} />
    </EmptyBar>
  )
}

// shell of bar fill (width of bar)
const EmptyBar = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: ${BAR_WIDTH_PX}px;
    height: ${BAR_HEIGHT_PX}px};
    background: transparent;
    border-radius: 5px;
    border: 1px solid black;
`

// fill of bar, colour and length is determined by hotness
const Fill = styled.div<{ hotness: number }>`
  width: 100%;
  height: ${({ hotness }) => hotness}%;
  background-image: ${({ hotness }) =>
    `linear-gradient(rgb(${255 - hotness * 2.55}, ${
      255 - hotness * 2.55
    }, 255), white)`};
  border-radius: 5px;
`
