import { addChunk } from '@/components/chunk';
import { addPosition } from '@/components/position';
import { addEntity, IWorld } from 'bitecs';
import { ChunkProps } from './types';

export function createChunk(world: IWorld, { x = 0, y = 0 } = {} as ChunkProps) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addChunk(world, entity);

    return entity;
}
