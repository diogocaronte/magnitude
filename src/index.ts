import { createWorld } from 'bitecs';
import { CircleAppearenceEnum } from './assets/circle';
import { addTTL } from './components/ttl';
import { addVelocity } from './components/velocity';
import { createCircle } from './entities/circle';
import './index.css';
import { createMovement } from './systems/movement';
import { createRenderer } from './systems/renderer';
import { createTTL } from './systems/ttl';

function init() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    document.querySelector('#app')?.append(canvas);

    const world = createWorld();
    const movementSystem = createMovement(world);
    const rendererSystem = createRenderer(world, context);
    const ttlSystem = createTTL(world);

    let nextIn = 0;

    (function loop() {
        const screenChanged = canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight;
        if (screenChanged) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }

        if (nextIn-- < 0) {
            nextIn = 10;

            const circleRed = createCircle(world, { x: canvas.width / 2, y: canvas.height / 2, appearence: CircleAppearenceEnum.RED });
            addTTL(world, circleRed, 100);
            addVelocity(world, circleRed, Math.random() - 0.5, Math.random() - 0.5);

            const circleBlue = createCircle(world, { x: canvas.width / 2, y: canvas.height / 2, appearence: CircleAppearenceEnum.BLUE });
            addTTL(world, circleBlue, 100);
            addVelocity(world, circleBlue, Math.random() - 0.5, Math.random() - 0.5);
        }

        movementSystem();
        rendererSystem();
        ttlSystem();

        requestAnimationFrame(loop);
    })();
}

document.addEventListener('DOMContentLoaded', init);
