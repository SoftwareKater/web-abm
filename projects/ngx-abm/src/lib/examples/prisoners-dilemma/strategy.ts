import { PrisonersOption } from './prisoners-option';
import { PrisonersKnowledge } from './prisoners-knowledge';

export interface Strategy {
  name: string;
  decisionRule: (options: PrisonersKnowledge) => PrisonersOption;
}

export class AlwaysBetrayStrategy implements Strategy {
  public name = 'Always Betray';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    return PrisonersOption.betray;
  }
}

export class AlwaysCoopStrategy implements Strategy {
  public name = 'Always Cooperate';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    return PrisonersOption.cooperate;
  }
}

export class ChaoticStrategy implements Strategy {
  public name = 'Chaotic';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    return Math.random() < 0.5
      ? PrisonersOption.betray
      : PrisonersOption.cooperate;
  }
}

/**
 * Cooperate until the other prisoner betrays.
 * Never cooperate again if the other prisoner betrayed once.
 */
export class NeverForgiveStrategy implements Strategy {
  public name = 'Never Forgive';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    if (
      options.previousDecisionsOfTheOtherPrisoner.includes(
        PrisonersOption.betray
      )
    ) {
      return PrisonersOption.betray;
    } else {
      return PrisonersOption.cooperate;
    }
  }
}

/**
 * Betray if the other prisoner betrayed in the last 3 rounds.
 */
export class ResentfulTitForTatStrategy implements Strategy {
  public name = 'Resentful Tit For Tat';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    if (
      options.previousDecisionsOfTheOtherPrisoner
        .slice(options.previousDecisionsOfTheOtherPrisoner.length - 3)
        .includes(PrisonersOption.betray)
    ) {
      return PrisonersOption.betray;
    } else {
      return PrisonersOption.cooperate;
    }
  }
}

/**
 * Betray if the other prisoner betrayed more often than she cooperated.
 */
export class Strategy1Strategy implements Strategy {
  public name = '1';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    if (
      options.previousDecisionsOfTheOtherPrisoner.filter(
        (d) => d === PrisonersOption.betray
      ).length >
      options.previousDecisionsOfTheOtherPrisoner.filter(
        (d) => d === PrisonersOption.cooperate
      ).length
    ) {
      return PrisonersOption.betray;
    } else {
      return PrisonersOption.cooperate;
    }
  }
}

/**
 * Play a fixed repeating set of decisions [c,c,c,b,b]
 */
export class Strategy2Strategy implements Strategy {
  public name = 'Repeat c-c-c-b-b';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    const decisions = [
      PrisonersOption.cooperate,
      PrisonersOption.cooperate,
      PrisonersOption.cooperate,
      PrisonersOption.betray,
      PrisonersOption.betray,
    ];
    const i = options.previousDecisions.length % 5;
    return decisions[i];
  }
}

export class TitForTatStrategy implements Strategy {
  public name = 'Tit For Tat';
  decisionRule(options: PrisonersKnowledge): PrisonersOption {
    if (
      options.previousDecisionsOfTheOtherPrisoner[
        options.previousDecisionsOfTheOtherPrisoner.length - 1
      ] === PrisonersOption.betray
    ) {
      return PrisonersOption.betray;
    } else {
      return PrisonersOption.cooperate;
    }
  }
}

export const allStrategies = [
  new AlwaysBetrayStrategy(),
  new AlwaysCoopStrategy(),
  new ChaoticStrategy(),
  new NeverForgiveStrategy(),
  new ResentfulTitForTatStrategy(),
  new Strategy1Strategy(),
  new Strategy2Strategy(),
  new TitForTatStrategy(),
]