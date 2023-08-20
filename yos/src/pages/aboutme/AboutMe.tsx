import ClassNames from './AboutMe.module.scss';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe () {  
  return (
    <div className={ClassNames.container}>
      <div className={ClassNames.wrapper}>
        <Portfolio />
      </div>
    </div>
  );
}
/**
 * animation component should be the minimum set of animation-sharing components.
 */
export default AboutMe;
