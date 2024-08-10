import { defineQuery, IWorld } from 'bitecs';
import { Friction } from '../components/friction';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';

export function createMovement(world: IWorld) {
    const movable = defineQuery([Position, Velocity]);
    const frictionable = defineQuery([Velocity, Friction]);

    return () => {
        for (const entity of movable(world)) {
            Position.x[entity] += Velocity.x[entity];
            Position.y[entity] += Velocity.y[entity];
        }

        for (const entity of frictionable(world)) {
            Velocity.x[entity] *= Friction.x[entity];
            Velocity.y[entity] *= Friction.y[entity];
        }
    };
}
