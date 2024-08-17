import { Circle, Indexable, Quadtree } from '@timohausmann/quadtree-ts';
import { createWorld, IWorld, pipe } from 'bitecs';
import { CircleAppearenceEnum } from '../../assets/circle/types';
import { addCircleCollision } from '../../components/circle/collision';
import { addFriction } from '../../components/friction';
import { Position } from '../../components/position';
import { Radius } from '../../components/radius';
import { addTTL } from '../../components/ttl';
import { addVelocity, Velocity } from '../../components/velocity';
import { KeyboardControl } from '../../controls/keyboard';
import { Application } from '../../core/application';
import { Scene } from '../../core/application/types';
import { CanvasTexture } from '../../core/texture/canvas';
import { CircleCollisionData } from '../../data/circle/types';
import { createCircle } from '../../entities/circle';
import { createCollision } from '../../systems/collision';
import { createMovement } from '../../systems/movement';
import { createRenderer } from '../../systems/renderer';
import { Camera } from '../../systems/renderer/camera';
import { createTTL } from '../../systems/ttl';
import { CircleSceneProps } from './types';
import { addPortal } from '../../components/portal';
import { createPortal } from '../../systems/portal';

export class CircleScene implements Scene {
    application: Application;
    screen: CanvasTexture;

    world: IWorld;
    camera: Camera;
    keyboard: KeyboardControl;
    player: number;
    portal: number;
    portal1: number;
    quadtree: Quadtree<Indexable & { data: CircleCollisionData }>;

    updateSystems: (...input: any[]) => any;
    renderSystems: (...input: any[]) => any;

    constructor(props: CircleSceneProps) {
        this.application = props.application;
        this.screen = new CanvasTexture();

        this.world = createWorld();
        this.camera = new Camera();
        this.keyboard = new KeyboardControl();

        this.player = createCircle(this.world, {
            radius: 10,
            appearence: CircleAppearenceEnum.GREEN,
        });
       
        
        addVelocity(this.world, this.player, 0, 0);
        addFriction(this.world, this.player, 0.9, 0.9);

        this.quadtree = new Quadtree({ x: -500, y: -500, width: 1000, height: 1000, maxObjects: 10 });
        const circleInstances: Circle<CircleCollisionData>[] = [];

        this.renderSystems = pipe(
            createRenderer({ world: this.world, context: this.screen.context, camera: this.camera, circleInstances }),
        );
        this.updateSystems = pipe(
            createMovement(this.world),
            createPortal(this.world),
            createTTL(this.world),
            createCollision({ world: this.world, quadtree: this.quadtree, circleInstances }),
        );

        this.portal = createCircle(this.world, {
            x: 400,
            y: 0,
            radius: 20,
            appearence: CircleAppearenceEnum.BLUE,
        });
        addPortal(this.world, this.portal, -200, 0)

        this.portal1 = createCircle(this.world, {
            x: -600,
            y: 0,
            radius: 20,
            appearence: CircleAppearenceEnum.BLUE,
        });
        addPortal(this.world, this.portal1, 200, 0)
    }

    spawnRandomCircle = () => {
        const circle = createCircle(this.world, {
            appearence: Math.random() > 0.5 ? CircleAppearenceEnum.RED : CircleAppearenceEnum.BLUE, // it will be ignored
        });
        addTTL(this.world, circle, Math.random() * 300); // 5 segundos
        addVelocity(this.world, circle, Math.random() - 0.5, Math.random() - 0.5);
        addCircleCollision(this.world, circle);
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

        const candidates = this.quadtree.retrieve(
            new Circle({
                x: Position.x[this.player],
                y: Position.y[this.player],
                r: Radius.value[this.player],
            }),
        );

        for (const candidate of candidates) {
            candidate.data.check = true;
        }
    }
}
