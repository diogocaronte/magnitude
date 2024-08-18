import { Texture } from '.';

export class OffscreenTexture extends Texture {
    declare texture: OffscreenCanvas;
    declare context: OffscreenCanvasRenderingContext2D;

    constructor(offscreen = new OffscreenCanvas(0, 0)) {
        super(offscreen);
    }
}
