import { CircleCollision } from '@/components/circle/collision';
import { Position } from '@/components/position';
import { Radius } from '@/components/radius';
import { CircleCollisionData, createCircleCollisionData } from '@/data/circle/collision';
import { CircleQuadtreeData, createCircleQuadtreeData } from '@/data/circle/quadtree';
import { IData } from '@/data/types';
import { PlayerTag } from '@/tags/player';
import { Circle, Indexable, Quadtree } from '@timohausmann/quadtree-ts';
import { defineQuery } from 'bitecs';
import { createInitializeData } from '../core/utils';
import { CreateCollisionProps } from './types';

export function createCollision({ world }: CreateCollisionProps) {
    const circles = defineQuery([Position, Radius, CircleCollision]);
    const players = defineQuery([Position, Radius, CircleCollision, PlayerTag]);

    const quadtree = new Quadtree({ x: -500, y: -500, width: 1000, height: 1000, maxObjects: 10 }) as Quadtree<Indexable & IData>;

    const initializeCollision = createInitializeData({
        componentRef: CircleCollision.index,
        query: defineQuery([Position, Radius, CircleCollision]),
        data: CircleCollisionData,
        factory: (entity: number) => createCircleCollisionData({ entity, check: false }),
    });

    const initializeCircle = createInitializeData({
        componentRef: CircleCollision.index,
        query: defineQuery([Position, Radius, CircleCollision]),
        data: CircleQuadtreeData,
        factory: (entity: number) => createCircleQuadtreeData({ entity }),
    });

    return () => {
        initializeCollision(world);
        initializeCircle(world);

        quadtree.clear();

        for (const entity of circles(world)) {
            const index = CircleCollision.index[entity];

            const instance = CircleQuadtreeData[index];
            instance.x = Position.x[entity] - Radius.value[entity];
            instance.y = Position.y[entity] - Radius.value[entity];
            instance.r = Radius.value[entity];

            const data = CircleCollisionData[index];
            data.check = false;

            quadtree.insert(instance);
        }

        for (const entity of players(world)) {
            const instance = new Circle({
                x: Position.x[entity],
                y: Position.y[entity],
                r: Radius.value[entity],
            });

            const candidates = quadtree.retrieve(instance);
            for (const candidate of candidates) {
                if (candidate.entity === entity) continue;

                const index = CircleCollision.index[candidate.entity];

                const distance = Math.hypot(
                    Position.x[entity] - Position.x[candidate.entity],
                    Position.y[entity] - Position.y[candidate.entity],
                );

                if (distance > Radius.value[entity] + Radius.value[candidate.entity]) continue;

                CircleCollisionData[index].check = true;
            }
        }
    };
}
