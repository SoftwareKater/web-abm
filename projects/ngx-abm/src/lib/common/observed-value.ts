export class ObservedValue<T> {
  public pastValues: T[] = [];

  public set value(v: T) {
    if (!v) {
      v = this.defaultValue;
    }
    this.pastValues.push(v);
    this.currentValue = v;
  }

  public get value(): T {
    return this.currentValue;
  }

  private currentValue: T;

  constructor(private readonly defaultValue: T) {}
}
