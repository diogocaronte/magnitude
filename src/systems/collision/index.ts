import { Circle } from '@timohausmann/quadtree-ts';
import { defineQuery, enterQuery, exitQuery } from 'bitecs';
import { CircleCollision } from '../../components/circle/collision';
import { Position } from '../../components/position';
import { Radius } from '../../components/radius';
import { createCircleCollisionData } from '../../data/circle/collision';
import { CreateCollisionProps } from './types';

export function createCollision({ world, circleInstances, quadtree }: CreateCollisionProps) {
    const circles = defineQuery([Position, Radius, CircleCollision]);
    const enterCircles = enterQuery(circles);
    const exitCircles = exitQuery(circles);

    return () => {
        quadtree.clear();

        for (const entity of enterCircles(world)) {
            const instance = new Circle({
                x: Position.x[entity],
                y: Position.y[entity],
                r: Radius.value[entity],
                data: createCircleCollisionData({ entity }),
            });
            CircleCollision.index[entity] = circleInstances.push(instance) - 1;
        }

        for (const entity of exitCircles(world)) {
            const lastInstance = circleInstances.pop()!;
            if (CircleCollision.index[entity] === circleInstances.length) continue;

            CircleCollision.index[lastInstance.data!.entity] = CircleCollision.index[entity];
            circleInstances[CircleCollision.index[entity]] = lastInstance;
        }

        for (const entity of circles(world)) {
            const instance = circleInstances[CircleCollision.index[entity]];

            instance.data!.check = false;
            instance.x = Position.x[entity] - Radius.value[entity];
            instance.y = Position.y[entity] - Radius.value[entity];
            instance.r = Radius.value[entity];

            quadtree.insert(instance);
        }
    };
}
