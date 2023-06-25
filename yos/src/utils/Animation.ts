import { Lookup, SpringRef, SpringValue } from "react-spring";

export function animation(
  target: any,
  key: string,
  desc: PropertyDescriptor
): void {
  // should be top
  const method = desc.value;
  desc.value = function (
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    ...args: any[]
  ) {
    const formerAnim = props.onAnim.get();
    if (formerAnim !== "") {
      console.log(`${key} animation prevented by ${formerAnim}`);
      return;
    }
    return method(api, props, ...args);
  };
}

export function unstoppable(
  target: any,
  key: string,
  desc: PropertyDescriptor
): void {
  const method = desc.value;
  desc.value = async function (
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    ...args: any[]
  ) {
    api.start({ immediate: true, onAnim: key });
    return method(api, props, ...args)[0].then((e: any) => {
      api.start({ immediate: true, onAnim: "" });
    });
  };
}
