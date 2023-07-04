import { Lookup, SpringRef, SpringValue } from "react-spring";

export const animation = (
  _target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  // should be top
  const method = desc.value;
  desc.value = function (
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    ...args: any[]
  ) {
    if (props.onAnim === undefined) {
      throw Error("animation should have onAnim property.");
    }
    const formerAnim = props.onAnim.get();
    if (formerAnim !== "") {
      console.log(`${key} animation prevented by ${formerAnim}`);
      return;
    }
    return method(api, props, ...args);
  };
};
export const unstoppable = (
  _target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  const method = desc.value;
  desc.value = async function (
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    ...args: any[]
  ) {
    api.start({ immediate: true, onAnim: key });
    return method(api, props, ...args)[0].then((_e: any) => {
      api.start({ immediate: true, onAnim: "" });
    });
  };
};
