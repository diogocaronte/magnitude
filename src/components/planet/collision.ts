import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const PlanetCollision = defineComponent({
    index: Types.ui32,
});

export function addPlanetCollision(world: IWorld, entity: number) {
    addComponent(world, PlanetCollision, entity);
    PlanetCollision.index[entity] = 0;
}
