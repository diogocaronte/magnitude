import type { CameraProps } from './types';

export class Camera {
    x: number;
    y: number;
    scale: number;

    constructor({ x = 0, y = 0, scale = 1 } = {} as CameraProps) {
        this.x = x;
        this.y = y;
        this.scale = scale;
    }
}
