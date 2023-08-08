import React, { type ComponentType, type ReactElement, cloneElement } from 'react';

function WithScalableSVG<T extends object> (
  WrappedSVG: ComponentType<T>
) {
  class ScalableSVG extends React.Component<T> {
    render () {
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

interface ScalableSVGWrapperProps {
  content: ReactElement
}

const ScalableSVGWrapper = ({ content }: ScalableSVGWrapperProps) => {
  const wrappedContent = cloneElement(content as any, {
    ...content.props,
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMidYMid meet'
  });
  return wrappedContent;
};

export { WithScalableSVG, ScalableSVGWrapper };
