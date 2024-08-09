import Timer from '.';
import { TimerCallback, TimerOperation } from './types';

export class DelayCallback implements TimerOperation {
    run!: TimerCallback;
    timer!: Timer;
    cancelled!: boolean;

    init(timer: Timer, run: TimerCallback) {
        this.run = run;
        this.timer = timer;
        this.cancelled = false;

        return this;
    }

    execute() {
        this.timer.pools.get(DelayCallback)!.release(this);
        if (this.cancelled) return;

        this.run(this.timer);
    }

    cancel() {
        this.cancelled = true;
    }
}
