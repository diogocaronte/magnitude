import { CircleAppearenceEnum } from '@/assets/circle/types';
import { PortalAppearenceEnum } from '@/assets/portal/types';
import { addCircleCollision } from '@/components/circle/collision';
import { addFriction } from '@/components/friction';
import { addInventory } from '@/components/inventory';
import { Position } from '@/components/position';
import { addTTL } from '@/components/ttl';
import { addVelocity, Velocity } from '@/components/velocity';
import { Application } from '@/core/application';
import { Scene } from '@/core/application/types';
import { World } from '@/core/world';
import { createCircle } from '@/entities/circle';
import { createPortal } from '@/entities/portal';
import { createCollision } from '@/systems/collision';
import { createCore } from '@/systems/core';
import { createCoreRenderSystem } from '@/systems/core/render';
import { createMovement } from '@/systems/movement';
import { createPortal as createPortalSystem } from '@/systems/portal';
import { createRenderer } from '@/systems/renderer';
import { createTTL } from '@/systems/ttl';
import { addPlayerTag } from '@/tags/player';
import { pipe } from 'bitecs';
import { CircleSceneProps } from './types';

export class CircleScene implements Scene {
    application: Application;
    $container: HTMLElement;

    world: World;
    player: number;
    portal: number;
    portal1: number;

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: CircleSceneProps) {
        this.application = props.application;
        this.$container = props.$container;
        this.world = new World();

        this.player = createCircle(this.world.bitworld, {
            radius: 20,
            appearence: CircleAppearenceEnum.GREEN,
        });
        addPlayerTag(this.world.bitworld, this.player);
        addVelocity(this.world.bitworld, this.player, 0, 0);
        addFriction(this.world.bitworld, this.player, 0.9, 0.9);
        addCircleCollision(this.world.bitworld, this.player);
        addInventory(this.world.bitworld, this.player);

        this.renderSystems = pipe(createCoreRenderSystem({ world: this.world }), createRenderer({ world: this.world }));
        this.updateSystems = pipe(
            createCore({ world: this.world }),
            createMovement({ world: this.world }),
            createPortalSystem({ world: this.world }),
            createTTL({ world: this.world }),
            createCollision({ world: this.world }),
        );

        this.portal = createPortal(this.world.bitworld, {
            x: 400,
            y: 0,
            px: -400,
            py: 0,
            radius: 20,
            appearence: PortalAppearenceEnum.CYAN,
        });

        this.portal1 = createPortal(this.world.bitworld, {
            x: -400,
            y: 0,
            px: 400,
            py: 0,
            radius: 20,
            appearence: PortalAppearenceEnum.CYAN,
        });
    }

    spawnRandomCircle = () => {
        const circle = createCircle(this.world.bitworld, {
            appearence: Math.random() > 0.5 ? CircleAppearenceEnum.RED : CircleAppearenceEnum.BLUE, // it will be ignored
        });
        addTTL(this.world.bitworld, circle, Math.random() * 300); // 5 segundos
        addVelocity(this.world.bitworld, circle, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5);
        addCircleCollision(this.world.bitworld, circle);
    };

    async enter() {
        this.world.attach(this.$container);

        const interval = this.application.timer.interval(this.spawnRandomCircle, 0, 1000 / 60);

        return () => {
            interval.cancel();
        };
    }

    async leave() {
        this.world.detach(this.$container);
    }

    render() {
        const diff_x = Position.x[this.player] - this.world.camera.x;
        const diff_y = Position.y[this.player] - this.world.camera.y;

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
