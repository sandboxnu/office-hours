import { ReactElement } from 'react'
import { Text } from './SharedComponents'

interface QuestionTypeProps {
  typeName: string
  typeColor: string
  onClick: () => void
}
export function QuestionType({
  typeName,
  typeColor,
  onClick,
}: QuestionTypeProps): ReactElement {
  function getBrightness(color: string): number {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    return (r * 299 + g * 587 + b * 114) / 1000
  }
  const textColor = getBrightness(typeColor) < 128 ? 'white' : 'black'

  return (
    <div
      style={{
        backgroundColor: typeColor,
        borderRadius: '15px',
        padding: '0px 7px',
        //marginTop: '2px',
        margin: '2px',
        display: 'inline-block',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Text style={{ fontSize: 'smaller', color: textColor }}>{typeName}</Text>{' '}
    </div>
  )
}
