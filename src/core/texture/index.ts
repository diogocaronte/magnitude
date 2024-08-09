import { ResizeCallback, TextureCanvas, TextureContext } from './types';

export class Texture {
    readonly texture: TextureCanvas;
    readonly context: TextureContext;

    readonly events = {
        resize: new Set<ResizeCallback>(),
    };

    constructor(canvas: TextureCanvas = new OffscreenCanvas(0, 0)) {
        this.texture = canvas;
        this.context = this.texture.getContext('2d')! as TextureContext;
    }

    resize(width = 300, height = width) {
        this.texture.width = width;
        this.texture.height = height;

        this.events.resize.forEach((callback) => callback({ width, height }));
    }

    clear() {
        this.context.clearRect(0, 0, this.texture.width, this.texture.height);
    }
}
