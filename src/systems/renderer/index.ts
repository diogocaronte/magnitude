import { defineQuery } from 'bitecs';
import { CircleAppearences } from '../../assets/circle';
import { CircleAppearenceEnum } from '../../assets/circle/types';
import { PortalAppearences } from '../../assets/portal';
import { CircleAppearence } from '../../components/circle/appearence';
import { CircleCollision } from '../../components/circle/collision';
import { PortalAppearence } from '../../components/portal/appearence';
import { Position } from '../../components/position';
import { Radius } from '../../components/radius';
import { TWO_PI } from '../../utils/math';
import { RendererProps } from './types';

export function createRenderer({ world, context, camera, circleInstances }: RendererProps) {
    const circles = defineQuery([Position, Radius, CircleAppearence]);
    const portals = defineQuery([Position, Radius, PortalAppearence]);
    const circlesCollision = defineQuery([Position, Radius, CircleAppearence, CircleCollision]);

    return () => {
        for (const entity of circlesCollision(world)) {
            const instance = circleInstances[CircleCollision.index[entity]];
            CircleAppearence.value[entity] = instance.data!.check ? CircleAppearenceEnum.RED : CircleAppearenceEnum.BLUE;
        }

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

        for (let entity of portals(world)) {
            const appearence = PortalAppearences[PortalAppearence.value[entity]];

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
