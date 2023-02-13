import type {OnEvent, RelayPool} from "./relay-pool";
import {Filter, Kind, type Event} from "nostr-tools";

export class Global {
  relayPool: RelayPool;
  relays: string[];
  constructor(relayPool: RelayPool, relays: string[]) {
    this.relayPool = relayPool;
    this.relays = relays;
  }

  subscribe(filters: Filter[], cb: OnEvent, maxDelayms: number): () => void {
    return this.relayPool.subscribe(
      filters.map((filter) => ({
        ...filter,
      })),
      this.relays,
      cb,
      maxDelayms
    );
  }

  longForm(cb: OnEvent, limit = 100, maxDelayms: number): () => void {
    return this.relayPool.subscribe(
      [
        {
          kinds: [30023],
          limit,
        },
      ],
      this.relays,
      cb,
      maxDelayms
    );
  }
}
