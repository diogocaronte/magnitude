import Timer from '.';

export interface TimerOperation {
    execute(timer: Timer): void;
}

export type TimerCallback = (timer: Timer) => void;
