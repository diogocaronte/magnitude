import { Position } from '@/components/position';
import { Radius } from '@/components/radius';
import { Rectangle } from '@/components/rectangle';
import { Size } from '@/components/size';
import { defineQuery, IWorld } from 'bitecs';

export function createBound(world: IWorld) {
    const rectangles = defineQuery([Rectangle, Position, Size]);
    const entities = defineQuery([Position, Radius]);

    return () => {
        const _entities = entities(world);
        for (const rectangle of rectangles(world)) {
            for (const entity of _entities) {
                if (rectangle === entity) continue;

                if (Size.width[rectangle] + Position.x[rectangle] - Position.x[entity]<= 0) {
                    Position.x[entity] = Position.x[rectangle]
                    console.log('%csrc\systems\bound.ts:18 Position.x[entity]', 'color: #007acc;', Position.x[entity]);
                }
                if (Size.height[rectangle] + Position.y[rectangle] - Position.y[entity] <= 0) {
                    Position.y[entity] = Position.y[rectangle]
                    console.log('%csrc\systems\bound.ts:23 Position.x[entity]', 'color: #007acc;', Position.x[entity]);
                }
               
                
            }
        }
    };
}
