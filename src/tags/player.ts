import { addComponent, defineComponent, IWorld } from 'bitecs';

export const PlayerTag = defineComponent();

export function addPlayerTag(world: IWorld, entity: number) {
    addComponent(world, PlayerTag, entity);
}
