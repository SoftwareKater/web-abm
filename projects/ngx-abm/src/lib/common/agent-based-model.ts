export interface AgentBasedModel<T, U> {
  params: T;
  run(): void;
  getResults(): U;
}
