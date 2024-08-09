import Timer from '.';
import { TimerCallback, TimerOperation } from './types';

export class IntervalCallback implements TimerOperation {
    run!: TimerCallback;
    timer!: Timer;
    cancelled!: boolean;
    interval!: number;

    init(timer: Timer, run: TimerCallback, interval: number) {
        this.run = run;
        this.timer = timer;
        this.interval = interval;
        this.cancelled = false;

        return this;
    }

    execute() {
        if (this.cancelled) {
            this.timer.pools.get(IntervalCallback)!.release(this);
            return;
        }

        // TODO: do we need a recursion prevent here?
        this.timer.schedule(this, this.interval);
        this.run(this.timer);
    }

    cancel() {
        this.cancelled = true;
    }
}
