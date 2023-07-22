import { CardAnimController } from "src/animations/CardAnim";

export const animation = (
  target: CardAnimController,
  key: string,
  desc: PropertyDescriptor
) => {
  let method = desc.value;
  desc.value = function (...args: any[]) {
    const controller = this as CardAnimController;
    method = method.bind(this);
    const [setCardAnim, cardAnim] = [
      controller.cardAnimAPI.setCardAnim,
      controller.cardAnimAPI.cardAnim,
    ];

    if (cardAnim.onAnim === undefined) {
      throw Error("All Animations should have onAnim property.");
    }

    const formerAnim = cardAnim.onAnim.get();
    if (formerAnim === "queueable") {
      setCardAnim.start({
        onResolve: () => {
          method(...args);
        },
      });
    } else if (formerAnim !== "") {
      console.log(`${key} animation prevented by ${formerAnim}`);
      return;
    }
    return method(...args);
  };
  return desc;
};
export const unstoppable =
  ({ queue = false } = {}) =>
  (
    _target: any, //decorator function object
    key: string, // decorator function name
    desc: PropertyDescriptor // additional infos
  ) => {
    const method = desc.value;
    desc.value = function (controller: CardAnimController, ...args: any[]) {
      const [setCardAnim, cardAnim] = [
        controller.cardAnimAPI.setCardAnim,
        controller.cardAnimAPI.cardAnim,
      ];
      if (queue) {
        setCardAnim.start({ immediate: true, onAnim: "queueable" });
      } else {
        setCardAnim.start({ immediate: true, onAnim: key });
      }
      return [
        method(controller, ...args)[0].then((_e: any) => {
          return setCardAnim.start({ immediate: true, onAnim: "" });
        }),
      ];
    };
    return desc;
  };
