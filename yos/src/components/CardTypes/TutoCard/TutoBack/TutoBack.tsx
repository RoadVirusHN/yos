import {
  type CardComponentData,
  type TutoCardData
} from '@data/CardProcessors'
import { type CardComponentProps } from '@components/CardTypes/Card'
import { animated } from 'react-spring'
import BackTexture from '@assets/components/TutoCard/doodles/tutoBack/cardboard.webp'
import ClassNames from './TutoBack.module.scss'
import { useRef, useState, useEffect } from 'react'
import TutoBackInfo from './TutoBackInfo'

const TutoBack = (tutoInfo: TutoCardData): CardComponentData<TutoCardData> => ({
  Data: tutoInfo.BackFace,
  Component: ({ cardData, cardAnimController }: CardComponentProps<TutoCardData>) => {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    const [_width, setWidth] = useState(0)
    const [cardAnim] = [cardAnimController.AnimStates.AnimAPI]

    useEffect(() => {
      setWidth(ref.current != null ? ref.current.clientWidth : 0)
      setHeight(ref.current != null ? ref.current.clientHeight : 0)
      cardAnim.AnimRef.set({
        shadow: false,
        ratio: 1 / 1
      })
    }, [cardAnim])
    return (
      <animated.div
        ref={ref}
        className={ClassNames.backgroundContainer}
        style={{
          backgroundImage: `url(${BackTexture})`,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }}
      >
        <TutoBackInfo
          width={height}
          height={height}
          backInfo={cardData.BackFace as { Src: string }}
        />
      </animated.div>
    )
  }
})
export default TutoBack
