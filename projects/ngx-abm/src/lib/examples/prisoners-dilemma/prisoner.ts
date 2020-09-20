import { Agent } from '../../common/agent';
import { PrisonersOption } from './prisoners-option';
import { ObservedValue } from '../../common/observed-value';
import { PrisonersKnowledge } from './prisoners-knowledge';
import { ChoiceVariable } from '../../common/choice-variable';
import { Strategy } from './strategy';

export class Prisoner extends Agent {
  public choice = new ChoiceVariable(PrisonersOption.cooperate, this.strategy.decisionRule);
  public reward = new ObservedValue<number>(0);

  constructor(public strategy: Strategy) {
    super();
  }
}
