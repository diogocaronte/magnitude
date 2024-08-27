import { TTL } from '@/components/ttl';
import { defineQuery, removeEntity } from 'bitecs';
import { CreateTTLProps } from './types';

export function createTTL({ world }: CreateTTLProps) {
    const entities = defineQuery([TTL]);

    return () => {
        const { bitworld } = world;

        for (const entity of entities(bitworld)) {
            TTL.value[entity] -= 1;
            if (TTL.value[entity] <= 0) removeEntity(bitworld, entity);
        }
    };
}
