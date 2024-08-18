import { addComponent, defineComponent, IWorld } from 'bitecs';

export const GeneratesChunk = defineComponent();

export function addGeneratesChunkTag(world: IWorld, entity: number) {
    addComponent(world, GeneratesChunk, entity);
}
