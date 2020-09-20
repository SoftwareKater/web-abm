import { Strategy } from './strategy';

export interface InitialValues {
  strategies: Strategy[];
  bothCoopPayoff: number;
  bothBetrayPayoff: number;
  betryedPayoff: number;
  betrayerPayoff: number;
  maxRounds: number;
}
