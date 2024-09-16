import { SpriteEnum } from '@/assets/sprite/types';
import { addFriction } from '@/components/friction';
import { Transform } from '@/components/transform';
import { addVelocity, Velocity } from '@/components/velocity';
import { Application } from '@/core/application';
import { Scene } from '@/core/application/types';
import { World } from '@/core/world';
import { createHero } from '@/entities/hero';
import { createSprite } from '@/entities/sprite';
import { createCore } from '@/systems/core';
import { createCoreRenderSystem } from '@/systems/core/render';
import { createMovement } from '@/systems/movement';
import { createRenderer } from '@/systems/renderer';
import { pipe } from 'bitecs';
import { SpriteSceneProps } from './types';

export class SpriteScene implements Scene {
    application: Application;
    $container: HTMLElement;
    world: World;

    player: number;

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: SpriteSceneProps) {
        this.application = props.application;
        this.$container = props.$container;
        this.world = new World();

        this.player = createHero(this.world.bitworld, {
            radius: 20,
        });
        addVelocity(this.world.bitworld, this.player, 0, 0);
        addFriction(this.world.bitworld, this.player, 0.9, 0.9);

        this.renderSystems = pipe(createCoreRenderSystem({ world: this.world }), createRenderer({ world: this.world }));
        this.updateSystems = pipe(createCore({ world: this.world }), createMovement({ world: this.world }));
    }

    async enter() {
        this.world.attach(this.$container);

        let amount = 1000;
        const sprites = [SpriteEnum.SAMPLE_2, SpriteEnum.SAMPLE_3, SpriteEnum.SAMPLE_4];
        while (amount--) {
            createSprite(this.world.bitworld, {
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                sprite: sprites[Math.floor(Math.random() * sprites.length)],
            });
        }
    }

    async leave() {
        this.world.detach(this.$container);
    }

    render() {
        const diff_x = Transform.x[this.player] - this.world.camera.x;
        const diff_y = Transform.y[this.player] - this.world.camera.y;

        this.world.camera.x += diff_x * 0.1;
        this.world.camera.y += diff_y * 0.1;

        this.renderSystems();
    }

    update() {
        if (this.world.keyboard.getState('ArrowRight') || this.world.keyboard.getState('KeyD')) Velocity.x[this.player] += 1;
        if (this.world.keyboard.getState('ArrowLeft') || this.world.keyboard.getState('KeyA')) Velocity.x[this.player] -= 1;
        if (this.world.keyboard.getState('ArrowUp') || this.world.keyboard.getState('KeyW')) Velocity.y[this.player] -= 1;
        if (this.world.keyboard.getState('ArrowDown') || this.world.keyboard.getState('KeyS')) Velocity.y[this.player] += 1;

        this.updateSystems();
    }
}
