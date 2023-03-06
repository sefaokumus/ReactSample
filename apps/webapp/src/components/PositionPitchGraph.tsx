import * as React from 'react'

import { PlayerStat, PositionType } from '@monorepo/common/types'

import { safeString } from '@monorepo/common/utils/helper'

import ElementResizeListener from './ElementResizeListner'

const PITCH_WIDTH_HEIGHT_RATIO = 1.5

type PositionPitchGraphProps = {
  mainPosition : PositionType
  positions: PositionType[] | (string | string[] | null)
  direction: 'horizontal' | 'vertical'
  width?: number
  squad?: PlayerStat[]
}
type PositionLabelProps = {
  position: PositionType | string
  width: number, style?: React.CSSProperties
  direction: 'horizontal' | 'vertical'
  color?: React.CSSProperties['color']
  shadowColor?: React.CSSProperties['color'],
  sizeRatio?: number
}
interface PositionPitchSvgProps extends React.SVGProps<SVGSVGElement>{
  direction: 'horizontal' | 'vertical'
}
const  PositionPitchSvg = ({ direction, height, width, fill, ...rest }: PositionPitchSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox= { direction === 'vertical' ? '0 0 700 1060' : '0 0 1060 700'}
      xmlSpace='preserve'
      // style={{ border: '1px solid black' }}
      {...rest}
    >
      <g
        fillOpacity={1}
        fillRule="evenodd"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        strokeOpacity={1}
        transform={ direction === 'vertical' ? undefined : 'rotate(90) translate(0 -1060)'}

      >
        <path
          fill={fill || '#00a000'}
          stroke="none"
          strokeWidth={10}
          strokeDasharray="none"
          d="M0 0H700V1060H0z"
        />
        <path
          d="M423.451 869.147h2.076c-16.77-23.637-44.364-39.062-75.531-39.062h0c-31.167 0-58.73 15.425-75.5 39.062h2.046"
          fill="none"
          stroke="#fff"
          strokeWidth={5.07433605}
          strokeDasharray="none"
        />
        <path
          d="M152.937 1029.99h-2.469V869.126h399.064v160.864h-2.531"
          fill="none"
          stroke="#fff"
          strokeWidth={5}
        />
        <path
          transform="matrix(.88725 0 0 .9555 -23.572 114.892)"
          d="M426.68 845.373a5.635 5.233 0 11-11.272 0 5.635 5.233 0 1111.271 0z"
          fill="#fff"
          stroke="none"
          strokeWidth={5}
          strokeDasharray="none"
        />
        <path
          transform="matrix(1.0647 0 0 1.1466 -98.286 -439.306)"
          d="M426.68 845.373a5.635 5.233 0 11-11.272 0 5.635 5.233 0 1111.271 0z"
          fill="#fff"
          stroke="none"
          strokeWidth={5}
          strokeDasharray="none"
        />
        <path
          transform="matrix(.88725 0 0 .9555 -23.572 -670.108)"
          d="M426.68 845.373a5.635 5.233 0 11-11.272 0 5.635 5.233 0 1111.271 0z"
          fill="#fff"
          stroke="none"
          strokeWidth={5}
          strokeDasharray="none"
        />
        <path
          d="M30.57 1015.98c6.96-.178 12.749 5.467 12.922 12.601.003.113.004.208.004.321M262.445 1030h-2.5v-51.91h180.11V1030h-2.5M442.537 530c0 51.08-41.457 92.537-92.537 92.537-51.08 0-92.537-41.457-92.537-92.537 0-51.08 41.457-92.537 92.537-92.537 51.08 0 92.537 41.457 92.537 92.537zM30.351 530h639.298M437.586 30.01h2.469v51.91h-180.11V30.01h2.531"
          fill="none"
          stroke="#fff"
          strokeWidth={5}
        />
        <path
          d="M30 30h640v1000H30V30z"
          fill="none"
          stroke="#fff"
          strokeWidth={5}
        />
        <path
          d="M547 30.007h2.532v160.864H150.468V30.007h2.5M276.287 190.921l-2.041.012h0c16.744 23.842 44.423 39.437 75.75 39.437 31.329 0 59.037-15.592 75.781-39.437h-2.038M668.564 43.79c-6.96.178-12.75-5.467-12.923-12.601a12.62 12.62 0 01-.004-.321M44.297 30.99c.178 6.96-5.468 12.75-12.602 12.923-.112.003-.208.004-.32.004M655.296 1028.5c-.177-6.96 5.468-12.75 12.602-12.923.113-.003.208-.004.32-.004"
          fill="none"
          stroke="#fff"
          strokeWidth={5}
        />
      </g>
    </svg>
  )
}
const PositionLabel     = ({ position, width, direction, color, shadowColor, sizeRatio, style }: PositionLabelProps) => {
  let top  = 0
  let left = 0

  const labelSize = width * (sizeRatio || 0.1)

  const leftCol = labelSize - (labelSize / 2)
  switch (position) {
  case 'GK':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO) - labelSize
    left = (width * 0.5) - (labelSize / 2)
    break
  case 'LB': case 'DL':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.85) - labelSize
    left = leftCol
    break
  case 'LCB':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.85) - labelSize
    left = leftCol + (width * 0.2)
    break
  case 'CB': case 'DC':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.85) - labelSize
    left = leftCol + (width * 0.4)
    break
  case 'RCB':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.85) - labelSize
    left = leftCol + (width * 0.6)
    break
  case 'RB': case 'DR':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.85) - labelSize
    left = leftCol + (width * 0.8)
    break
  case 'LWB':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.68) - labelSize
    left = leftCol
    break
  case 'RWB':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.68) - labelSize
    left = leftCol + (width * 0.8)
    break
  case 'DM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.68) - labelSize
    left = leftCol + (width * 0.4)
    break
  case 'LDM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.68) - labelSize
    left = leftCol + (width * 0.2)
    break
  case 'RDM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.68) - labelSize
    left = leftCol + (width * 0.6)
    break
  case 'LM': case 'ML':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.50) - labelSize
    left = leftCol
    break
  case 'LCM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.53) - labelSize
    left = leftCol + (width * 0.2)
    break
  case 'CM': case 'MC':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.53) - labelSize
    left = leftCol + (width * 0.4)
    break
  case 'RCM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.53) - labelSize
    left = leftCol + (width * 0.6)
    break
  case 'RM': case 'MR':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.50) - labelSize
    left = leftCol + (width * 0.8)
    break
  case 'LW':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.30) - labelSize
    left = leftCol
    break
  case 'LAM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.35) - labelSize
    left = leftCol + (width * 0.2)
    break
  case 'CAM':case 'AM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.35) - labelSize
    left = leftCol + (width * 0.4)
    break
  case 'RAM':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.35) - labelSize
    left = leftCol + (width * 0.6)
    break
  case 'RW':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.30) - labelSize
    left = leftCol + (width * 0.8)
    break
  case 'LF':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.20) - labelSize
    left = leftCol + labelSize
    break
  case 'CF':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.20) - labelSize
    left = leftCol + (width * 0.4)
    break
  case 'RF':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.20) - labelSize
    left = leftCol + (width * 0.7)
    break
  case 'ST':
    top  = (width * PITCH_WIDTH_HEIGHT_RATIO * 0.10) - labelSize
    left = leftCol + (width * 0.4)
    break
  }

  return <div
    style={{
      fontFamily: 'Poppins',
      fontSize: labelSize / 2.5,
      height: labelSize,
      width: labelSize,
      borderRadius: labelSize,
      position: 'absolute',
      backgroundColor: color || '#FFF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: `0px 0px 20px 0px ${shadowColor || '#E01038'}`,
      zIndex: 100,
      top: direction === 'vertical' ? top : left,
      // bottom: direction === 'vertical' ? undefined : left,
      left: direction === 'vertical' ? left : undefined,
      right: direction === 'vertical' ? undefined : top,

      fontWeight: 'bold',
      ...style
    }}
  >{position}</div>
}

const PositionPitchGraph = ({ mainPosition, positions, direction, squad, ...rest }: PositionPitchGraphProps) => {
  const ref                                = React.useRef<HTMLDivElement>(null)
  const [pitchWidth, setPitchWidth]        = React.useState(0)
  const secondaryPositions: PositionType[] = positions ? safeString(positions) : []
  React.useEffect(() => {
    adaptResize()
  }, [])

  const adaptResize = React.useCallback(() => {
    if (ref.current) {
      setPitchWidth(direction === 'vertical' ?  (ref.current?.offsetWidth || 0)  : (ref.current?.offsetHeight || 0) * 0.98)
    }
  }, [])

  return (
    <div style={{
      width: '100%',
      maxWidth: 500,
      minWidth: 300,
      position: 'relative',
      height: 'fit-content'
    }}
    ref={ref}
    >
      <ElementResizeListener onResize={adaptResize} />

      <PositionLabel
        position={mainPosition}
        width={pitchWidth}
        direction={direction}
        color={'#fff1f0'}
        shadowColor={'#E01038'}
        sizeRatio={0.12}
      />

      {
        secondaryPositions.map((position, index) => {
          return <PositionLabel
            key={index}
            position={position}
            width={pitchWidth}
            direction={direction}
            shadowColor={'#1890ff'}
          />
        })
      }

      {/* <PositionLabel width={pitchWidth} direction={direction} position={'GK'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LCB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RCB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'CB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LWB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RWB'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LDM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'DM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RDM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LCM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'CM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RCM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LW'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LAM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'CAM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RAM'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RW'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'LF'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'CF'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'RF'} />
      <PositionLabel width={pitchWidth} direction={direction} position={'ST'} />  */}

      <PositionPitchSvg fill='#bdebbb' direction={direction}  {...rest} />
    </div>
  )
}

export default PositionPitchGraph
