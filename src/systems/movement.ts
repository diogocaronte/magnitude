import { defineQuery, IWorld } from 'bitecs';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';

export function createMovement(world: IWorld) {
    const movable = defineQuery([Position, Velocity]);

    return () => {
        for (const entity of movable(world)) {
            Position.x[entity] += Velocity.x[entity];
            Position.y[entity] += Velocity.y[entity];
        }
    };
}
