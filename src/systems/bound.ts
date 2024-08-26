import { Position } from '@/components/position';
import { Radius } from '@/components/radius';
import { Rectangle } from '@/components/rectangle';
import { Size } from '@/components/size';
import { defineQuery, IWorld } from 'bitecs';

export function createBound(world: IWorld) {
    const rectangles = defineQuery([Rectangle, Position]);
    const entities = defineQuery([Position]);

    return () => {
        const _entities = entities(world);
        for (const rectangle of rectangles(world)) {
            for (const entity of _entities) {
                if (rectangle === entity) continue;

                if (Position.x[entity] - Radius.value[entity] >= 0 &&
                    Position.x[entity] + Radius.value[entity] <= Size.width[rectangle] &&
                    Position.y[entity] - Radius.value[entity] >= 0 &&
                    Position.y[entity] + Radius.value[entity] <= Size.height[rectangle]
                ){
                    Position.x[entity] -= 1;
                    Position.y[entity] -= 1;
                }
            }
        }
    };
}
