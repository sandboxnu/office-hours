import { ReactElement } from 'react'
import styled from 'styled-components'

// couldn't figure out how to make the height of the bar dynamic
const BAR_WIDTH_PX = 10
const BAR_HEIGHT_PX = 50

/**
 * Renders a vertical bar that shows the hotness of a question.
 * @param hotness a number between 0 (least hot) to 100 (most hot)
 * @param hasGreen whether or not to have the variation where the bar goes from green to red (as one colour) vs white to red (as a gradient)
 */
export default function HotnessBar({
  hotness,
  hasGreen,
}: {
  hotness: number
  hasGreen: boolean
}): ReactElement {
  return (
    <EmptyBar>
      <Fill hotness={hotness} hasGreen={hasGreen} />
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
const Fill = styled.div<{ hotness: number; hasGreen?: boolean }>`
  width: 100%;
  height: ${({ hotness }) => hotness}%;
  ${({ hotness, hasGreen = true }) =>
    hasGreen
      ? `background-color: rgb(${hotness * 2.55}, ${255 - hotness * 2.55}, 0)`
      : `background-image: linear-gradient(rgb(255, ${255 - hotness * 2.55}, ${
          255 - hotness * 2.55
        }), white)}`};
  border-radius: 5px;
`
