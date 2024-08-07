import { defineQuery, IWorld } from 'bitecs';
import { CircleAppearences } from '../assets/circle';
import { CircleAppearence } from '../components/circle/appearence';
import { Position } from '../components/position';
import { Radius } from '../components/radius';
import { TWO_PI } from '../utils/math';

export function createRenderer(world: IWorld, context: CanvasRenderingContext2D) {
    const circles = defineQuery([Position, Radius, CircleAppearence]);

    return () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (let entity of circles(world)) {
            const appearence = CircleAppearences[CircleAppearence.value[entity]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Position.x[entity], Position.y[entity], Radius.value[entity], 0, TWO_PI);
            context.fill();
            context.stroke();
        }
    };
}
