import { PlanetAppearenceEnum } from '@/assets/planet/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const PlanetAppearence = defineComponent({
    value: Types.ui8,
});

export function addPlanetAppearence(world: IWorld, entity: number, value: PlanetAppearenceEnum) {
    addComponent(world, PlanetAppearence, entity);
    PlanetAppearence.value[entity] = value;
}
