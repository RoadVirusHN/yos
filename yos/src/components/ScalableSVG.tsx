import React, { ComponentType, cloneElement } from "react";
import { ReactNode } from "react";

export function WithScalableSVG<T extends object>(
  WrappedSVG: ComponentType<T>
) {
  class ScalableSVG extends React.Component<T> {
    render() {
      return (
        <WrappedSVG
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
          {...this.props}
        />
      );
    }
  }
  return ScalableSVG;
}

type ScalableSVGWrapperProps = {
  content: ReactNode;
};

const ScalableSVGWrapper = ({ content }: ScalableSVGWrapperProps) => {
  const wrappedContent = cloneElement(content as any, {
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
  });
  console.log(wrappedContent);
  return wrappedContent;
};

export default ScalableSVGWrapper;
