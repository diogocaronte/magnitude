export type ApplicationProps = {
    frameRate?: number;
    autoStart?: boolean;
};

export interface Scene {
    enter(): Promise<(() => Promise<void> | void) | void>;
    leave(): Promise<void>;
    render(): void;
    update(): void;
}
