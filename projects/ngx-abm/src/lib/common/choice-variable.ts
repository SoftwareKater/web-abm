import { ObservedValue } from './observed-value';

/**
 * A choice variable could for example be the price set by a firm or
 * the demand set by a consumer.
 */
export class ChoiceVariable<T, U> extends ObservedValue<T> {
  /**
   * TODO: rename options parameter, the idea was that you make choices based on options.
   * But I end up using the options parameter to model the experience and observations, that
   * the agent draws from when making a decision.
   */
  constructor(defaultValue: T, private readonly makeChoice: (options: U) => T) {
    super(defaultValue);
  }

  /**
   * Call this method update the current value of the underlying observed value.
   * This method uses the makeChoice method to determine the choice and assigns
   * it to the current value of the uderlying observed value.
   */
  public choose(options: U): void {
    this.value = this.makeChoice(options);
  }
}
