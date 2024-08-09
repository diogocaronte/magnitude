import Timer from '../timer';

export type ApplicationProps = {
    autoStart: boolean;
    frameRate: number;
    autoResize: boolean;
    timer: Timer;
};

export interface Scene {
    enter(): Promise<(() => Promise<void> | void) | void>;
    leave(): Promise<void>;
    render(): void;
    update(): void;
}
