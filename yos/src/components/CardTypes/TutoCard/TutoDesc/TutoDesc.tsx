import { type CardComponentProps } from "@components/CardTypes/Card";
import { animated, to, useSpring } from "react-spring";
import ClassNames from "./TutoDesc.module.scss";
import {
  type CardComponentData,
  type TutoCardData,
} from "@data/CardProcessors";
import { ScalableSVGWrapper } from "@lib/SVG/ScalableSVG";
import { useEffect, useRef } from "react";
import React from "react";

const TutoDesc = (tutoData: TutoCardData): CardComponentData<TutoCardData> => ({
  Data: tutoData.Description,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI,
  }: CardComponentProps<TutoCardData>) => {
    const [props, api] = useSpring(() => ({ offset: 0, display: "block" }));
    const ref = useRef<HTMLDivElement>(null);
    const startTitle = `<span>DRAG&nbsp; <span class=${ClassNames.emphasis}>CARD</span> &nbsp;OVER<br />THE DASHED LINE.</span>`;
    const thenTitle = `<span class=${ClassNames.emphasis}>DROP THE CARD!</span>`;
    useEffect(() => {
      api.start(() => ({
        from: { offset: 0 },
        to: { offset: 2000 },
        loop: true,
        config: { duration: 20000 },
      }));
      if (ref.current != null) ref.current.innerHTML = startTitle;
    }, [api, startTitle]);
    const [cardAnim, deckAnim] = [
      cardAnimController.AnimStates.AnimAPI.AnimValues,
      deckAnimAPI.deckAnim,
    ];
    const { isTop, blur } = cardAnim;
    return (
      <>
        <animated.div
          ref={ref}
          className={ClassNames.chrome}
          style={{
            opacity: isTop.to((v) => {
              if (v === 0) {
                api.start({ display: "none" });
              }
              return v;
            }),
            content: blur.to((v) => {
              if (ref.current != null) {
                ref.current.innerHTML = v > 0.1 ? thenTitle : startTitle;
              }
              return "";
            }),
          }}
        />
        <animated.div
          className={ClassNames.lineBox}
          style={{
            opacity: cardAnim.isTop,
            display: props.display,
            content: to([deckAnim.order], (order) => {
              if (order[1] === cardData.Index) {
                (
                  ref.current as HTMLDivElement
                ).innerHTML = `THANK YOU FOR <span class=${ClassNames.emphasis}>VISITING</span>!`;
              }
              return "";
            }),
          }}
        >
          <ScalableSVGWrapper
            content={
              <svg
                width="892"
                height="642"
                viewBox="-10 -10 920 665"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <animated.path
                  d="M1 181C1 81.5887 81.5887 1 181 1H711C810.411 1 891 81.5887 891 181V461C891 560.411 810.411 641 711 641H181C81.5888 641 1 560.411 1 461V181Z"
                  stroke="black"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="40 40"
                  style={{ strokeDashoffset: props.offset }}
                />
              </svg>
            }
          />
        </animated.div>
      </>
    );
  },
});

export default TutoDesc;
