// Data about components, Animation State, Hard coded datas, Constants etc...
import { canFlick } from '@components/CardTypes/CardComponents/useDefaultCardHandlers';
import { animation, unstoppable } from '@lib/Animation/Animation';
import {
  type ControllerProps,
  type GoalProp,
  type Lookup,
  type SpringChain,
  type SpringRef,
  type SpringToFn,
  type SpringValues,
  config
} from 'react-spring';
import { CardSideEnum } from './Enums';

const getCardWidth = () => Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-width').replace("px", ""));

export const flickableDistance = () => ({
  fW: getCardWidth() * 1 / 2,
  fH: getCardWidth() * 64 / 89 * 1 / 2
})

export const snapDist = () => ({
  sW: getCardWidth(),
  sH: getCardWidth() * 64 / 89
});
export interface AnimDefaultStyle {
  // Common Styles for All Animations
  AnimConfig: { unstoppable: { config: boolean, except: string[] }, queueable: string[] }
}
export type AnimAPIInput<T extends Lookup<any>> = AnimStatesOutput<T> & AnimDefaultStyle;
export interface CardStyles extends Lookup<any> {
  // Styles for cards.
  x: number
  y: number
  z: number
  rx: number
  ry: number
  rz: number
  gray: number
  blur: number
  scale: number
  ratio: string
  shadow: boolean
  isTop: number
  cursor: 'grab' | 'default' | 'grabbing' | 'alias'
  side: CardSideEnum
}

export type AnimStatesOutput<T extends Lookup<any>> =
  // AnimStates Function Return Type
  (
    | Partial<T>
    | {
      from: Partial<T>
      to?: GoalProp<T> | SpringToFn<T> | SpringChain<T> | undefined
    }
  ) &
  ControllerProps<T, undefined>;
/**
 * Abstract Class for Animation States.
 * you can add `State${StateName}` method for more states.
 */
export abstract class AnimStates<Styles extends Lookup<any>> {
  AnimRef: SpringRef<Styles>
  AnimValues: SpringValues<Styles>

  constructor(
    AnimRef: SpringRef<Styles>,
    AnimValues: SpringValues<Styles>
  ) {
    this.AnimRef = AnimRef;
    this.AnimValues = AnimValues;
  }
  abstract StateInit(...args: any): AnimStatesOutput<Styles>;
}
export class CardAnimStates extends AnimStates<CardStyles> {
  @unstoppable()
  StateInit(order: number, deckLength: number): AnimStatesOutput<CardStyles> {
    const radians = (((order * 360) / deckLength + 180) * Math.PI) / 180;
    const x = window.innerWidth * 2 * Math.cos(radians);
    const y = window.innerWidth * 2 * Math.sin(radians);
    return {
      x,
      y,
      z: 1,
      rx: 0,
      ry: 0,
      rz: 0,
      gray: 0,
      blur: 0,
      scale: 1.5,
      isTop: order === deckLength - 1 ? 1 : 0,
      ratio: "89/64",
      shadow: true,
      cursor: order === deckLength - 1 ? 'grab' : 'default',
      side: CardSideEnum.FRONT,
    };
  }

  @animation()
  StateStart(order: number, deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      x: 0,
      y: order * -4, // make slightly upward
      z: order + 1,
      rx: 0,
      ry: 0,
      scale: 1,
      rz: -4 + Math.random() * 8,
      gray: 0,
      blur: 0,
      side: CardSideEnum.FRONT,
      isTop: order === deckLength - 1 ? 1 : 0,
      cursor: order === deckLength - 1 ? 'grab' : 'default',
      delay: order * 200
    };
  }

  @unstoppable({ except: ["StateReorder", "StateInit", "StateStart"] })
  StateReorder(beforeOrder: number[], newOrder: number[], cardKey: number): AnimStatesOutput<CardStyles> {
    // const beforeIdxOfCurrentTop = beforeOrder.indexOf(newOrder.at(-1) ?? 0);
    // const shiftDist = beforeIdxOfCurrentTop + 1;
    // const unshiftDist = newOrder.length - beforeIdxOfCurrentTop - 1;
    // const isShift = unshiftDist > shiftDist;
    // const cardHeight = window.innerHeight;

    // const beforeIdx = beforeOrder.indexOf(cardKey);
    const newIdx = newOrder.indexOf(cardKey)
    const isNewTop = newOrder.at(-1) === cardKey
    const isNewBottom = newOrder[0] === cardKey
    return {
      to: [
        { // change z index, blur
          rz: this.AnimValues.rz.get() + 2 - Math.random() * 4,
          z: newIdx,
          blur: isNewBottom ? 2 : 0,
          gray: isNewTop ? 0 : 0.7,
          config: { tension: 210, friction: 20 }
        },
        { // move to deck, if card is palced in the floor by user, keep the position.
          x: canFlick([this.AnimValues.x.get(), this.AnimValues.y.get()]) && newOrder[0] === cardKey ? undefined : 0,
          scale: 1,
          y: canFlick([this.AnimValues.x.get(), this.AnimValues.y.get()]) && newOrder[0] === cardKey ? undefined : newOrder.indexOf(cardKey) * -4,
          cursor: 'grab',
          isTop: isNewTop ? 1 : 0,
          config: { tension: 210, friction: 20 }
        }
      ]
    };

  }


  /**
   *  get the nearest flickable point from mouse pointer
   *  change scale and z,
   *  take it to the top
   * @returns 
   */
  @unstoppable()
  StateTop(deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      to: [
        {
          y: this.AnimValues.y.get(),
          rz: this.AnimValues.rz.get() + 4 - Math.random() * 8,
          z: deckLength,
          scale: 1.1,
          blur: 0,
          gray: 0,
          isTop: 1,
          config: { tension: 210, friction: 20 }
        },
        {
          x: 0,
          z: deckLength,
          scale: 1,
          y: deckLength * -4,
          cursor: 'grab',
          config: { tension: 210, friction: 20 }
        }
      ]
    };
  }

  /**
   *  get the nearest flickable point from mouse pointer
   *  change scale and z,
   *  take it to the bottom
   * @returns 
   */
  @unstoppable()
  StateFloor(): AnimStatesOutput<CardStyles> {
    return {
      from: {
        isTop: 0,
      },
      to: [{
        gray: 0.7,
        blur: 2,
        cursor: 'grab',
        config: config.stiff
      }, {
        z: 0,
        scale: 1,
        cursor: 'alias',
        config: config.stiff
      }]
    };
  }

  // @animation()
  // StateReorder(order: number, deckLength: number): AnimStatesOutput<CardStyles> {
  //   return {
  //     x: 0,
  //     y: order * -4,
  //     z: order,
  //     scale: 1,
  //     gray: 0,
  //     blur: 0,
  //     isTop: order === deckLength - 1 ? 1 : 0,
  //     cursor: order === deckLength - 1 ? 'grab' : 'default',
  //     config: { tension: 200 }
  //   };
  // }


  @animation()
  StatePick(): AnimStatesOutput<CardStyles> {
    return {
      scale: 1.1,
      rz: this.AnimValues.rz.get() + (Math.random() * 6 - 3),
      delay: undefined,
      cursor: 'grabbing',
      config: { friction: 50, tension: 800 }
    };
  }

  @animation()
  StateFloat(deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      z: deckLength + 1,
      cursor: 'grabbing',
      scale: 1.1,
      gray: 0,
      blur: 0,
      config: { tension: 200 }
    };
  }

  @animation()
  StateFlickable(deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      z: deckLength + 1,
      scale: 1.1,
      gray: 0.7,
      blur: 2,
      cursor: 'grabbing'
    };
  }

  @animation()
  StateMove(distance: [dX: number, dY: number]): AnimStatesOutput<CardStyles> {
    let [dX, dY] = distance;
    const { fW, fH } = flickableDistance();
    const { sW, sH } = snapDist();
    const absX = Math.abs(dX);
    const absY = Math.abs(dY);
    if (absX > fW && absX < sW) {
      const ratio = sW / absX;
      dX = dX * ratio;
    }

    if (absY > fH && absY < sH) {
      const ratio = sH / absY;
      dY = dY * ratio;
    }
    return {
      x: dX,
      y: dY,
      cursor: 'grabbing'
    };
  }

  @unstoppable({ except: ["StateBack"] })
  StateFront(): AnimStatesOutput<CardStyles> {
    if (this.AnimValues.side.get() === CardSideEnum.FRONT) {
      return {};
    }
    return {
      from: { side: CardSideEnum.FRONT },
      to: [
        { ry: 0, rz: 45, z: 100, scale: 1.4 },
        {
          rx: 0,
          ry: 0,
          rz: -4 + Math.random() * 8,
          z: this.AnimValues.z.get(),
          scale: 1
        }
      ],
      config: {
        tension: 640,
        friction: 60
      }
    };
  }

  @unstoppable({ except: ["StateFront"] })
  StateBack(): AnimStatesOutput<CardStyles> {
    if (this.AnimValues.side.get() === CardSideEnum.BACK) {
      return {};
    }
    return {
      from: { side: CardSideEnum.BACK },
      to: [
        { ry: 180, rz: 45, z: 100, scale: 1.4 },
        {
          // rx: 180,
          rz: 90 - 4 + Math.random() * 8,
          z: this.AnimValues.z.get(),
          scale: 1
        }
      ],
      config: {
        tension: 640,
        friction: 60
      }
    };
  }
}
