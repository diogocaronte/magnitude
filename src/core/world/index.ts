import { createWorld, type IWorld } from 'bitecs';
import { Camera } from '../camera';
import { KeyboardControl } from '../controls/keyboard';
import { MouseControl } from '../controls/mouse';
import { CanvasTexture } from '../texture/canvas';
import type { IPointerData, IViewportData, WorldProps } from './types';

export class World {
    bitworld: IWorld;
    camera: Camera;
    screen: CanvasTexture;
    viewport: IViewportData;
    mouse: MouseControl;
    keyboard: KeyboardControl;
    pointer: IPointerData;

    constructor(
        {
            world = createWorld(),
            camera = new Camera(),
            screen = new CanvasTexture(),
            mouse = new MouseControl(),
            keyboard = new KeyboardControl(),
        } = {} as WorldProps,
    ) {
        this.bitworld = world;
        this.camera = camera;
        this.screen = screen;
        this.mouse = mouse;
        this.keyboard = keyboard;

        this.viewport = { x: 0, y: 0, scale: 0, width: 0, height: 0, halfWidth: 0, halfHeight: 0, left: 0, right: 0, top: 0, bottom: 0 };
        this.pointer = { x: 0, y: 0 };
    }

    attach($container: HTMLElement) {
        $container.appendChild(this.screen.texture);
        this.mouse.attach($container);
        this.keyboard.attach(document.body); // review this
    }

    detach($container: HTMLElement) {
        $container.removeChild(this.screen.texture);
        this.mouse.detach($container);
        this.keyboard.detach(document.body); // review this
    }
}
