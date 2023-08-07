import { type Lookup } from 'react-spring';

export type componentProps = Record<string, Lookup>;

export interface AnimData<AnimProps> {
  states: Record<string, (...args: any[]) => AnimProps>
}
