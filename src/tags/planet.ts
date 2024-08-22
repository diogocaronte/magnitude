import { addComponent, defineComponent, IWorld } from 'bitecs';

export const PlanetTag = defineComponent();

export function addPlanetTag(world: IWorld, entity: number) {
    addComponent(world, PlanetTag, entity);
}
