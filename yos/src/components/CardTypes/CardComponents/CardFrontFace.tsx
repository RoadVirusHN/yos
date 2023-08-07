import { animated, to } from 'react-spring';
import { filt } from 'src/utils/MyAnimation';
import ClassNames from './CardFrontFace.module.scss';
import { type CardComponentProps } from '../Card';
import { type AllCardData, type CardStates } from 'src/data/CardProcessors';

const CardFrontFace = ({
  cardStates,
  props
}: {
  cardStates: CardStates<AllCardData>
  props: CardComponentProps
}) => {
  const { gray, blur } = props.cardAnimController.AnimStates.AnimAPI.AnimValues;
  return (
    <animated.div
      className={`${ClassNames.front} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt)
      }}
    >
      <cardStates.FrontFace.Component {...props} />
    </animated.div>
  );
};
export default CardFrontFace;
