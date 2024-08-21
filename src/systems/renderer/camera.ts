import { CameraProps } from './types';

export class Camera {
    x: number;
    y: number;
    scale: number;

    constructor({ x = 0, y = x, scale = 1 } = {} as CameraProps) {
        this.x = x;
        this.y = y;
        this.scale = scale;
    }
}
