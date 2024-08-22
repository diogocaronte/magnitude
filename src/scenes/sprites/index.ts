import { SpriteEnum } from '@/assets/sprite/types';
import { addFriction } from '@/components/friction';
import { Position } from '@/components/position';
import { addVelocity, Velocity } from '@/components/velocity';
import { KeyboardControl } from '@/controls/keyboard';
import { Application } from '@/core/application';
import { Scene } from '@/core/application/types';
import { CanvasTexture } from '@/core/texture/canvas';
import { createSprite } from '@/entities/sprite';
import { createCore } from '@/systems/core';
import { createMovement } from '@/systems/movement';
import { createRenderer } from '@/systems/renderer';
import { Camera } from '@/systems/renderer/camera';
import { createWorld, IWorld, pipe } from 'bitecs';
import { SpriteSceneProps } from './types';

export class SpriteScene implements Scene {
    application: Application;
    screen: CanvasTexture;

    world: IWorld;
    camera: Camera;
    keyboard: KeyboardControl;
    player: number;

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: SpriteSceneProps) {
        this.application = props.application;
        this.screen = new CanvasTexture();

        this.world = createWorld();
        this.camera = new Camera();
        this.keyboard = new KeyboardControl();

        this.player = createSprite(this.world, {
            sprite: SpriteEnum.SAMPLE,
            w: 64,
            h: 64,
        });
        addVelocity(this.world, this.player, 0, 0);
        addFriction(this.world, this.player, 0.9, 0.9);

        this.renderSystems = pipe(createRenderer({ world: this.world, context: this.screen.context, camera: this.camera }));

        this.updateSystems = pipe(createCore(this.world), createMovement(this.world));
    }

    async enter() {
        let amount = 1000;
        const sprites = [SpriteEnum.SAMPLE_2, SpriteEnum.SAMPLE_3, SpriteEnum.SAMPLE_4];
        while (amount--) {
            createSprite(this.world, {
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                sprite: sprites[Math.floor(Math.random() * sprites.length)],
            });
        }

        this.keyboard.attach(document.body);
    }

    async leave() {
        this.keyboard.detach(document.body);
    }

    render() {
        this.screen.context.imageSmoothingEnabled = false;

        const isClient = this.screen.isClientSize();
        if (!isClient) this.screen.toClientSize();

        const diff_x = Position.x[this.player] - this.camera.x;
        const diff_y = Position.y[this.player] - this.camera.y;

        this.camera.x += diff_x * 0.1;
        this.camera.y += diff_y * 0.1;

        this.renderSystems();
    }

    update() {
        if (this.keyboard.getState('ArrowRight') || this.keyboard.getState('KeyD')) Velocity.x[this.player] += 1;
        if (this.keyboard.getState('ArrowLeft') || this.keyboard.getState('KeyA')) Velocity.x[this.player] -= 1;
        if (this.keyboard.getState('ArrowUp') || this.keyboard.getState('KeyW')) Velocity.y[this.player] -= 1;
        if (this.keyboard.getState('ArrowDown') || this.keyboard.getState('KeyS')) Velocity.y[this.player] += 1;

        this.updateSystems();
    }
}
