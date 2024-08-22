import { addComponent, defineComponent, IWorld } from 'bitecs';

export const AsteroidTag = defineComponent();

export function addAsteroidTag(world: IWorld, entity: number) {
    addComponent(world, AsteroidTag, entity);
}
