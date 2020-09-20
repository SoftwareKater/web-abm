import { Prisoner } from './prisoner';
import { PrisonersOption } from './prisoners-option';
import { allStrategies, Strategy } from './strategy';
import { InitialValues } from './initial-values';
import { AgentBasedModel } from '../../common/agent-based-model';
import { Statistics } from '../../common/statistics';
import { DilemmaResult } from './dilemma-result';

export class DilemmaABM
  implements AgentBasedModel<InitialValues, DilemmaResult> {
  private agents: Prisoner[];
  private results: DilemmaResult = [];

  constructor(public params: InitialValues) {}

  public run() {
    this.logParams();

    for (const s1 of this.params.strategies) {
      for (const s2 of this.params.strategies) {
        this.initialize(s1, s2);

        const prisoner1 = this.agents[0];
        const prisoner2 = this.agents[1];

        this.logSetup();
        // Let them play the prisoners dilemma
        for (let i = 0; i < this.params.maxRounds; i++) {
          const prisoner1PastDecisions = [...prisoner1.choice.pastValues];
          const prisoner2PastDecisions = [...prisoner2.choice.pastValues];

          // Both prisoners make their choice to cooperate or betray.
          prisoner1.choice.choose({
            previousDecisions: prisoner1PastDecisions,
            previousDecisionsOfTheOtherPrisoner: prisoner2PastDecisions,
          });
          prisoner2.choice.choose({
            previousDecisions: prisoner2PastDecisions,
            previousDecisionsOfTheOtherPrisoner: prisoner1PastDecisions,
          });

          // Calculate the payoffs and assign them to the prisoners
          const rewards = this.getPayoff(
            prisoner1.choice.value,
            prisoner2.choice.value
          );
          prisoner1.reward.value = rewards[0];
          prisoner2.reward.value = rewards[1];

          // this.logRoundRoundResults(i + 1, prisoner1, prisoner2);
        }
        this.logResult();
        this.results.push(this.agents);
      }
    }
  }

  public getResults(): DilemmaResult {
    return this.results;
  }

  /**
   * Calculates the payoff for both prisoners based on their decisions.
   */
  private getPayoff(c1: PrisonersOption, c2: PrisonersOption): number[] {
    if (c1 === PrisonersOption.cooperate && c2 === PrisonersOption.cooperate) {
      return [this.params.bothCoopPayoff, this.params.bothCoopPayoff];
    }
    if (c1 === PrisonersOption.cooperate && c2 === PrisonersOption.betray) {
      return [this.params.betryedPayoff, this.params.betrayerPayoff];
    }
    if (c1 === PrisonersOption.betray && c2 === PrisonersOption.cooperate) {
      return [this.params.betrayerPayoff, this.params.betryedPayoff];
    }
    if (c1 === PrisonersOption.betray && c2 === PrisonersOption.betray) {
      return [this.params.bothBetrayPayoff, this.params.bothBetrayPayoff];
    }
  }

  /**
   * Initialize the two prisoners.
   */
  private initialize(prisoner1Strategy: Strategy, prisoner2Strategy: Strategy) {
    const prisoner1 = new Prisoner(prisoner1Strategy);
    const prisoner2 = new Prisoner(prisoner2Strategy);
    this.agents = [prisoner1, prisoner2];
  }

  private logParams() {
    console.log('====================');
    console.log('Prisoners Dilemma');
    console.log('====================');
  }

  private logSetup() {
    console.log(
      `${this.agents[0].strategy.name} vs ${this.agents[1].strategy.name}`
    );
    console.log(`Playing ${this.params.maxRounds} rounds`);
    console.log('--------------------');
  }

  private logResult() {
    const statistics = new Statistics();

    const rewards = this.agents.map((p) => p.reward.pastValues);
    const overallRewardsPerRound = statistics.getAggregateTimeSeries(
      rewards,
      this.params.maxRounds
    );
    console.log('Overall Rewards per round', overallRewardsPerRound);
    console.table({
      bothBetrayed: overallRewardsPerRound.filter((r) => r === 2).length,
      bothCooperated: overallRewardsPerRound.filter((r) => r === 4).length,
      oneWasBetrayed: overallRewardsPerRound.filter((r) => r === 3).length,
    });
    console.log('--------------------');
  }

  private logRoundRoundResults(
    round: number,
    prisoner1: Prisoner,
    prisoner2: Prisoner
  ) {
    console.log(`Round ${round}`);
    console.log('====================');
    console.table({
      prisoner1Choice: prisoner1.choice.value,
      prisoner2Choice: prisoner2.choice.value,
      prisoner1Reward: prisoner1.reward.value,
      prisoner2Reward: prisoner2.reward.value,
    });
    console.log(
      `Accumulated Result: ${prisoner1.reward.pastValues.reduce(
        (a, b) => a + b
      )} : ${prisoner2.reward.pastValues.reduce((a, b) => a + b)} `
    );
    console.log('--------------------');
  }
}
