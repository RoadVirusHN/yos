import { CardAnimController } from "src/animations/CardAnim";

export function animation(
  target: CardAnimController,
  key: string,
  desc: PropertyDescriptor
) {
  const method = desc.value;
  desc.value = function (this: CardAnimController, ...args: any[]) {
    // method = method.bind(this); // this produces singleton controller.

    const [setCardAnim, cardAnim] = [
      this.cardAnimAPI.setCardAnim,
      this.cardAnimAPI.cardAnim,
    ];

    if (cardAnim.onAnim === undefined) {
      throw Error("All Animations should have onAnim property.");
    }

    const formerAnim = cardAnim.onAnim.get();
    if (formerAnim === "queueable") {
      setCardAnim.start({
        onResolve: () => {
          method.call(this, ...args);
        },
      });
    } else if (formerAnim !== "") {
      console.log(`${key} animation prevented by ${formerAnim}`);
      return;
    }
    return method.call(this, ...args);
  };
  return desc;
}
export const unstoppable =
  ({ queue = false } = {}) =>
  (
    _target: any, //decorator function object
    key: string, // decorator function name
    desc: PropertyDescriptor // additional infos
  ) => {
    let method = desc.value;
    desc.value = function (this: CardAnimController, ...args: any[]) {
      const [setCardAnim, cardAnim] = [
        this.cardAnimAPI.setCardAnim,
        this.cardAnimAPI.cardAnim,
      ];
      if (queue) {
        setCardAnim.start({ immediate: true, onAnim: "queueable" });
      } else {
        setCardAnim.start({ immediate: true, onAnim: key });
      }
      return [
        method.call(this, ...args)[0].then((_e: any) => {
          return setCardAnim.start({ immediate: true, onAnim: "" });
        }),
      ];
    };
    return desc;
  };
