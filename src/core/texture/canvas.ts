import { Texture } from '.';

export class CanvasTexture extends Texture {
    declare texture: HTMLCanvasElement;
    declare context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement = document.createElement('canvas')) {
        super(canvas);
    }

    isClientSize() {
        return this.texture.width == this.texture.clientWidth && this.texture.height == this.texture.clientHeight;
    }

    toClientSize() {
        this.resize(this.texture.clientWidth, this.texture.clientHeight);
    }
}
