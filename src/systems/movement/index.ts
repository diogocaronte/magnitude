import { Friction } from '@/components/friction';
import { Transform } from '@/components/transform';
import { Velocity } from '@/components/velocity';
import { defineQuery } from 'bitecs';
import { CreateMovementProps } from './types';

export function createMovement({ world }: CreateMovementProps) {
    const movable = defineQuery([Transform, Velocity]);
    const frictionable = defineQuery([Velocity, Friction]);

    return () => {
        const { bitworld } = world;

        for (const entity of movable(bitworld)) {
            Transform.x[entity] += Velocity.x[entity];
            Transform.y[entity] += Velocity.y[entity];
        }

        for (const entity of frictionable(bitworld)) {
            Velocity.x[entity] *= Friction.x[entity];
            Velocity.y[entity] *= Friction.y[entity];
        }
    };
}
