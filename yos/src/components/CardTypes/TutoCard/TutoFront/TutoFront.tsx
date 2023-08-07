import { type CardComponentProps } from 'src/components/CardTypes/Card';
import ClassNames from './TutoFront.module.scss';
import { animated, to } from 'react-spring';
import { type CardComponentData, type TutoCardData } from 'src/data/CardProcessors';
import { filt } from 'src/utils/MyAnimation';
import { useRef } from 'react';

const TutoFront = (
  tutoInfo: TutoCardData
): CardComponentData<TutoCardData> => ({
  Data: tutoInfo.FrontFace,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI
  }: CardComponentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [cardAnim, deckAnim] = [
      cardAnimController.AnimStates.AnimAPI.AnimValues,
      deckAnimAPI.deckAnim
    ];
    return (
      <animated.div
        className={`${ClassNames.front} ${ClassNames.face}`}
        style={{
          filter: to([cardAnim.gray, cardAnim.blur], filt),
          content: to([deckAnim.order], (order) => {
            if (order[1] === cardData.Index) {
              (ref.current as HTMLDivElement).innerText = 'DONE!';
            }
            return '';
          })
        }}
      >
        <div className={ClassNames.container}>
          <div ref={ref} className={ClassNames.portfolio}>
            <div style={{ fontSize: '50%', lineHeight: '30%' }}>THE</div>
            LUXURIST
          </div>
          <div className={ClassNames.name}>JUNSEOK-YUN PORTFOLIO</div>
        </div>
      </animated.div>
    );
  }
});
export default TutoFront;
