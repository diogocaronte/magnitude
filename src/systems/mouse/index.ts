import { Transform } from '@/components/transform';
import { MouseAngle } from '@/tags/mouse-angle';
import { defineQuery } from 'bitecs';
import { CreateMouseFollowProps } from './types';

export function createMouseFollow({ world }: CreateMouseFollowProps) {
    const entities = defineQuery([Transform, MouseAngle]);

    return () => {
        const { pointer, bitworld } = world;
        for (const entity of entities(bitworld)) {
            const angle = Math.atan2(pointer.y - Transform.y[entity], pointer.x - Transform.x[entity]);
            Transform.angle[entity] = angle;
        }
    };
}
