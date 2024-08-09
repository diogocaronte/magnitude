import Timer from '.';
import { DelayCallback } from './delay';
import { TimerCallback, TimerOperation } from './types';

export class AnimationCallback implements TimerOperation {
    run!: TimerCallback;
    timer!: Timer;
    cancelled!: boolean;

    onFrameEnd = () => this.timer.schedule(this, 0);

    init(timer: Timer, run: TimerCallback) {
        this.run = run;
        this.timer = timer;
        this.cancelled = false;

        this.timer.events.frameEnd.add(this.onFrameEnd);

        return this;
    }

    execute() {
        if (this.cancelled) {
            this.timer.pools.get(DelayCallback)!.release(this);
            this.timer.events.frameEnd.delete(this.onFrameEnd);
            return;
        }

        this.run(this.timer);
    }

    cancel() {
        this.cancelled = true;
    }
}
