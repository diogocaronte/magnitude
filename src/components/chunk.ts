import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Chunk = defineComponent({
    index: Types.ui16,
});

export function addChunk(world: IWorld, entity: number) {
    addComponent(world, Chunk, entity);
    Chunk.index[entity] = 0;
}
