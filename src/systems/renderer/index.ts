import { defineQuery } from 'bitecs';
import { CircleAppearences } from '../../assets/circle';
import { CircleAppearence } from '../../components/circle/appearence';
import { Position } from '../../components/position';
import { Radius } from '../../components/radius';
import { TWO_PI } from '../../utils/math';
import { RendererProps } from './types';

export function createRenderer({ world, context, camera }: RendererProps) {
    const circles = defineQuery([Position, Radius, CircleAppearence]);

    return () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.save();

        const { width, height } = context.canvas;

        context.translate(width / 2, height / 2);
        context.scale(camera.scale, camera.scale);
        context.translate(-camera.x, -camera.y);

        for (let entity of circles(world)) {
            const appearence = CircleAppearences[CircleAppearence.value[entity]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Position.x[entity], Position.y[entity], Radius.value[entity], 0, TWO_PI);
            context.fill();
            context.stroke();
        }

        context.restore();
    };
}
