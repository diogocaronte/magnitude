import { addComponent, defineComponent, IWorld, Types } from 'bitecs';
import { PlanetAppearenceEnum } from '../../assets/planet/types';

export const PlanetAppearence = defineComponent({
    value: Types.ui8,
});

export function addPlanetAppearence(world: IWorld, entity: number, value: PlanetAppearenceEnum) {
    addComponent(world, PlanetAppearence, entity);
    PlanetAppearence.value[entity] = value;
}
