import { type CardComponentProps } from 'src/components/CardTypes/Card';
import { animated, to, useSpring } from 'react-spring';
import ClassNames from './TutoDesc.module.scss';
import { type CardComponentData, type TutoCardData } from 'src/data/CardProcessors';
import { ScalableSVGWrapper } from 'src/components/ScalableSVG';
import { useEffect, useRef } from 'react';

const TutoDesc = (tutoData: TutoCardData): CardComponentData<TutoCardData> => ({
  Data: tutoData.Description,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI
  }: CardComponentProps) => {
    const [props, api] = useSpring(() => ({ offset: 0, display: 'block' }));

    useEffect(() => {
      api.start(() => ({
        from: { offset: 0 },
        to: { offset: 2000 },
        loop: true,
        config: { duration: 20000 }
      }));
    }, [api]);
    const ref = useRef<HTMLDivElement>(null);
    const [cardAnim, deckAnim] = [
      cardAnimController.AnimStates.AnimAPI.AnimValues,
      deckAnimAPI.deckAnim
    ];
    const { isTop, blur } = cardAnim;
    return (
      <>
        <animated.div
          ref={ref}
          className={ClassNames.chrome}
          style={{
            opacity: isTop.to((v) => {
              if (v === 0) {
                api.start({ display: 'none' });
              }
              return v;
            }),
            content: blur.to((v) => {
              if (ref.current != null) {
                if (v > 0.1) {
                  (
                    ref.current
                  ).innerHTML = `<span class=${ClassNames.emphasis}>DROP THE CARD!</span>`;
                } else {
                  (
                    ref.current
                  ).innerHTML = `DRAG&nbsp; <span class=${ClassNames.emphasis}>CARD</span> &nbsp;OVER THE DASHED LINE.`;
                }
              }
              return '';
            })
          }}
        >
          DRAG&nbsp;
          <span className={ClassNames.emphasis}>CARD</span>
          &nbsp;OVER THE DASHED LINE.
        </animated.div>
        <animated.div
          className={ClassNames.lineBox}
          style={{
            opacity: cardAnim.isTop,
            display: props.display,
            content: to([deckAnim.order], (order) => {
              if (order[1] === cardData.Index) {
                (
                  ref.current as HTMLDivElement
                ).innerHTML = `THANK YOU FOR <span class=${ClassNames.emphasis}>VISITING</span>!`;
              }
              return '';
            })
          }}
        >
          <ScalableSVGWrapper
            content={
              <svg
                width="892"
                height="642"
                viewBox="-10 -10 920 665"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <animated.path
                  d="M1 181C1 81.5887 81.5887 1 181 1H711C810.411 1 891 81.5887 891 181V461C891 560.411 810.411 641 711 641H181C81.5888 641 1 560.411 1 461V181Z"
                  stroke="black"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="40 40"
                  style={{ strokeDashoffset: props.offset }}
                />
              </svg>
            }
          />
        </animated.div>
      </>
    );
  }
});

export default TutoDesc;
