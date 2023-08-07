import { type Lookup } from 'react-spring';
import { type CardAnimController } from 'src/animations/CardAnim';
import { type AnimStates } from 'src/data/CardData';

export function animation<T extends Lookup<any>> (
  _target: AnimStates<T>,
  key: string,
  desc: PropertyDescriptor
) {
  const method = desc.value;
  desc.value = function (this: AnimStates<T>, ...args: any[]) {
    // method = method.bind(this); // this produces singleton controller.

    // if (this.StyleValues.onAnim.get() === undefined) {
    //   throw Error("All Animations should have onAnim property.");
    // }

    // const formerAnim = this.StyleValues.onAnim.get();
    // if (formerAnim === "queueable") {
    //   // setCardAnim.start({
    //   //   onResolve: () => {
    //   //     method.call(this, ...args);
    //   //   },
    //   // });
    // } else if (formerAnim !== "") {
    //   console.log(`${key} animation prevented by ${formerAnim}`);
    //   return;
    // }
    return method.call(this, ...args);
  };
  return desc;
}
export const unstoppable =
  ({ queue = false } = {}) =>
    (
      _target: any, // decorator function object
      key: string, // decorator function name
      desc: PropertyDescriptor // additional infos
    ) => {
      const method = desc.value;
      desc.value = function (this: CardAnimController, ...args: any[]) {
        const [setCardAnim, cardAnim] = [
          this.cardAnimAPI.setCardAnim,
          this.cardAnimAPI.cardAnim
        ];
        if (queue) {
          setCardAnim.start({ immediate: true, onAnim: 'queueable' });
        } else {
          setCardAnim.start({ immediate: true, onAnim: key });
        }
        return [
          method.call(this, ...args)[0].then((_e: any) => {
            return setCardAnim.start({ immediate: true, onAnim: '' });
          })
        ];
      };
      return desc;
    };
