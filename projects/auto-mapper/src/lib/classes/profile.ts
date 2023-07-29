import { PropertyMapper } from "../types/property-mapper";

export class Profile<S extends object, D extends object> {
  private readonly _destinationInitialState: D;

  constructor(destinationInitialState: D) {
    this._destinationInitialState = destinationInitialState;
  }

  public forMember<K extends keyof D>(destKey: K, destFn: PropertyMapper<S, D, K>): this {
    // @ts-ignore
    this._destinationInitialState[destKey] = destFn;
    return this;
  }

  /**
   * Internal method to get the initial state of the destination object
   */
  public getInitialState(): D {
    return { ...this._destinationInitialState };
  }
}
