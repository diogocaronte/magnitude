import { createWorld, IWorld, pipe } from 'bitecs';
import { CircleAppearenceEnum } from '../../assets/circle/types';
import { addFriction } from '../../components/friction';
import { Position } from '../../components/position';
import { addTTL } from '../../components/ttl';
import { addVelocity, Velocity } from '../../components/velocity';
import { KeyboardControl } from '../../controls/keyboard';
import { Application } from '../../core/application';
import { Scene } from '../../core/application/types';
import { CanvasTexture } from '../../core/texture/canvas';
import { createCircle } from '../../entities/circle';
import { createMovement } from '../../systems/movement';
import { createRenderer } from '../../systems/renderer';
import { Camera } from '../../systems/renderer/camera';
import { createTTL } from '../../systems/ttl';
import { CircleSceneProps } from './types';

export class CircleScene implements Scene {
    application: Application;
    screen: CanvasTexture;

    world: IWorld;
    camera: Camera;
    keyboard: KeyboardControl;
    player: number;

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: CircleSceneProps) {
        this.application = props.application;
        this.screen = new CanvasTexture();

        this.world = createWorld();
        this.camera = new Camera();
        this.keyboard = new KeyboardControl();

        this.player = createCircle(this.world, {
            appearence: CircleAppearenceEnum.GREEN,
        });
        addVelocity(this.world, this.player, 0, 0);
        addFriction(this.world, this.player, 0.9, 0.9);

        this.renderSystems = pipe(createRenderer({ world: this.world, context: this.screen.context, camera: this.camera }));
        this.updateSystems = pipe(createMovement(this.world), createTTL(this.world));
    }

    spawnRandomCircle = () => {
        const circle = createCircle(this.world, {
            appearence: Math.random() > 0.5 ? CircleAppearenceEnum.RED : CircleAppearenceEnum.BLUE,
        });
        addTTL(this.world, circle, Math.random() * 300); // 5 segundos
        addVelocity(this.world, circle, Math.random() - 0.5, Math.random() - 0.5);
    };

    async enter() {
        const interval = this.application.timer.interval(this.spawnRandomCircle, 0, 1000 / 30);

        this.keyboard.attach(document.body);

        return () => {
            interval.cancel();
        };
    }

    async leave() {
        this.keyboard.detach(document.body);
    }

    render() {
        const isClient = this.screen.isClientSize();
        if (!isClient) this.screen.toClientSize();

        const diff_x = Position.x[this.player] - this.camera.x;
        const diff_y = Position.y[this.player] - this.camera.y;

        this.camera.x += diff_x * 0.1;
        this.camera.y += diff_y * 0.1;

        this.renderSystems();
    }

    update() {
        if (this.keyboard.getState('ArrowRight') || this.keyboard.getState('KeyD')) {
            Velocity.x[this.player] += 1;
        }

        if (this.keyboard.getState('ArrowLeft') || this.keyboard.getState('KeyA')) {
            Velocity.x[this.player] -= 1;
        }

        if (this.keyboard.getState('ArrowUp') || this.keyboard.getState('KeyW')) {
            Velocity.y[this.player] -= 1;
        }

        if (this.keyboard.getState('ArrowDown') || this.keyboard.getState('KeyS')) {
            Velocity.y[this.player] += 1;
        }

        this.updateSystems();
    }
}
