import { PrisonersOption } from './prisoners-option';

export interface PrisonersKnowledge {
  previousDecisions: PrisonersOption[];
  previousDecisionsOfTheOtherPrisoner: PrisonersOption[];
}
