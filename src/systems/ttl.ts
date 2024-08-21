import { TTL } from '@/components/ttl';
import { defineQuery, IWorld, removeEntity } from 'bitecs';

export function createTTL(world: IWorld) {
    const entities = defineQuery([TTL]);

    return () => {
        for (const entity of entities(world)) {
            TTL.value[entity] -= 1;
            if (TTL.value[entity] <= 0) removeEntity(world, entity);
        }
    };
}
