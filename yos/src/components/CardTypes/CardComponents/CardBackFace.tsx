import { animated, to } from 'react-spring';
import { filt } from 'src/utils/MyAnimation';
import { type CardComponentProps } from 'src/components/CardTypes/Card';
import { type AllCardData, type CardStates } from 'src/data/CardProcessors';
import ClassNames from './CardBackFace.module.scss';

const CardBackFace = ({
  cardStates,
  props
}: {
  cardStates: CardStates<AllCardData>
  props: CardComponentProps
}) => {
  const { gray, blur } = props.cardAnimController.AnimStates.AnimAPI.AnimValues;
  return (
    <animated.div
      className={`${ClassNames.back} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt)
      }}
    >
      <cardStates.BackFace.Component {...props} />
    </animated.div>
  );
};
export default CardBackFace;
