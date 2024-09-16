import { EnemyAppearenceEnum } from '@/assets/enemy/types';
import { addEnemyCollision } from '@/components/enemy/collision';
import { addFriction } from '@/components/friction';
import { Transform } from '@/components/transform';
import { addTTL } from '@/components/ttl';
import { addVelocity, Velocity } from '@/components/velocity';
import { Application } from '@/core/application';
import { Scene } from '@/core/application/types';
import { World } from '@/core/world';
import { createBullet } from '@/entities/bullet';
import { createEnemy } from '@/entities/enemy';
import { createHero } from '@/entities/hero';
import { createCollision } from '@/systems/collision';
import { createCore } from '@/systems/core';
import { createCoreRenderSystem } from '@/systems/core/render';
import { createMouseFollow } from '@/systems/mouse';
import { createMovement } from '@/systems/movement';
import { createRenderer } from '@/systems/renderer';
import { createTTL } from '@/systems/ttl';
import { addMouseAngleTag } from '@/tags/mouse-angle';
import { pipe } from 'bitecs';
import { BattleSceneProps } from './types';

export class BattleScene implements Scene {
    application: Application;
    $container: HTMLElement;
    world: World;

    player: number;

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: BattleSceneProps) {
        this.application = props.application;
        this.$container = props.$container;
        this.world = new World();

        this.player = createHero(this.world.bitworld, { radius: 20 });
        addVelocity(this.world.bitworld, this.player, 0, 0);
        addFriction(this.world.bitworld, this.player, 0.9, 0.9);
        addMouseAngleTag(this.world.bitworld, this.player);

        this.renderSystems = pipe(createCoreRenderSystem({ world: this.world }), createRenderer({ world: this.world }));
        this.updateSystems = pipe(
            createCore({ world: this.world }),
            createMovement({ world: this.world }),
            createMouseFollow({ world: this.world }),
            createCollision({ world: this.world }),
            createTTL({ world: this.world }),
        );
    }

    spawnRandomEnemy = () => {
        const enemy = createEnemy(this.world.bitworld, {
            x: -500 + Math.random() * 1000,
            y: -500 + Math.random() * 1000,
            radius: 10 + Math.random() * 10,
            appearence: EnemyAppearenceEnum.GREY,
        });
        addEnemyCollision(this.world.bitworld, enemy);
    };

    async enter() {
        let amount = 1000;
        while (amount--) this.spawnRandomEnemy();

        this.world.attach(this.$container);
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
        if (this.world.mouse.getState(0)) {
            const x = Transform.x[this.player];
            const y = Transform.y[this.player];

            const vx = this.world.pointer.x - Transform.x[this.player];
            const vy = this.world.pointer.y - Transform.y[this.player];

            const length = Math.sqrt(vx * vx + vy * vy);

            const bullet = createBullet(this.world.bitworld, {
                x,
                y,
                angle: 0,
                vx: (vx / length) * 30,
                vy: (vy / length) * 30,
                radius: 2,
            });
            addTTL(this.world.bitworld, bullet, 100);
        }

        if (this.world.keyboard.getState('ArrowRight') || this.world.keyboard.getState('KeyD')) Velocity.x[this.player] += 1;
        if (this.world.keyboard.getState('ArrowLeft') || this.world.keyboard.getState('KeyA')) Velocity.x[this.player] -= 1;
        if (this.world.keyboard.getState('ArrowUp') || this.world.keyboard.getState('KeyW')) Velocity.y[this.player] -= 1;
        if (this.world.keyboard.getState('ArrowDown') || this.world.keyboard.getState('KeyS')) Velocity.y[this.player] += 1;

        this.updateSystems();
    }
}
