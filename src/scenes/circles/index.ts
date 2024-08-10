import { createWorld, IWorld, pipe } from 'bitecs';
import { CircleAppearenceEnum } from '../../assets/circle/types';
import { addTTL } from '../../components/ttl';
import { addVelocity } from '../../components/velocity';
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

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: CircleSceneProps) {
        this.application = props.application;
        this.screen = new CanvasTexture();

        this.world = createWorld();
        this.camera = new Camera();
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

        return () => {
            interval.cancel();
        };
    }

    async leave() {}

    render() {
        const isClient = this.screen.isClientSize();
        if (!isClient) this.screen.toClientSize();

        this.renderSystems();
    }

    update() {
        this.updateSystems();
    }
}
