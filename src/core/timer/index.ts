import { Pool } from '@/utils/pool';
import { ConstructorOf } from '@/utils/types';
import FlatQueue from 'flatqueue';
import { AnimationCallback } from './animation';
import { DelayCallback } from './delay';
import { IntervalCallback } from './interval';
import { TimerCallback, TimerOperation } from './types';

export default class Timer {
    private executionTime = 0;
    private lastExecutionTime = 0;
    private frameExecutionTime = 0;
    private speed = 0;
    private playing = false;
    private requestID = -1;

    queue = new FlatQueue<TimerOperation>();
    pools = new Map<ConstructorOf<TimerOperation>, Pool<TimerOperation>>();

    events = {
        frameStart: new Set<TimerCallback>(),
        frameEnd: new Set<TimerCallback>(),
    };

    constructor() {
        [DelayCallback, IntervalCallback, AnimationCallback].forEach((classe) => this.pools.set(classe, new Pool<TimerOperation>(classe)));
    }

    get now() {
        return this.executionTime;
    }

    schedule(executable: TimerOperation, delay = 1000) {
        this.queue.push(executable, this.executionTime + delay);
    }

    animation(callback: TimerCallback, delay = 1000) {
        const callable = this.pools.get(AnimationCallback)!.create() as AnimationCallback;
        callable.init(this, callback);
        this.schedule(callable, delay);
        return callable;
    }

    delay(callback: TimerCallback, delay = 1000) {
        const callable = this.pools.get(DelayCallback)!.create() as DelayCallback;
        callable.init(this, callback);
        this.schedule(callable, delay);
        return callable;
    }

    interval(callback: TimerCallback, delay = 1000, interval = 1000) {
        const callable = this.pools.get(IntervalCallback)!.create() as IntervalCallback;
        callable.init(this, callback, interval);
        this.schedule(callable, delay);
        return callable;
    }

    update(now = performance.now()) {
        const delta = now - this.lastExecutionTime;
        this.lastExecutionTime = now;

        this.events.frameStart.forEach((callback) => callback(this));
        this.frameExecutionTime += delta * this.speed;
        do {
            const nextPriority = this.queue.peekValue() ?? Infinity;
            const cannotExecute = nextPriority > this.frameExecutionTime;
            if (cannotExecute) break;

            this.executionTime = nextPriority;
            const executable = this.queue.pop()!;
            executable.execute(this);
        } while (true);

        this.executionTime = this.frameExecutionTime;
        this.events.frameEnd.forEach((callback) => callback(this));
    }

    private loop = (now = performance.now()) => {
        this.requestID = requestAnimationFrame(this.loop);
        this.update(now);
    };

    play(speed = 1) {
        if (this.playing) return;
        if (speed < 0) return;

        this.playing = true;
        this.speed = speed;
        this.lastExecutionTime = performance.now();
        this.requestID = requestAnimationFrame(this.loop);
    }

    stop() {
        if (!this.playing) return;

        this.playing = false;
        cancelAnimationFrame(this.requestID);
        this.frameExecutionTime = this.executionTime;
    }

    clear() {
        this.queue.clear();
    }
}
