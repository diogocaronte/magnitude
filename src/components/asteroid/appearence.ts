import { AsteroidAppearenceEnum } from '@/assets/asteroid/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const AsteroidAppearence = defineComponent({
    value: Types.ui8,
});

export function addAsteroidAppearence(world: IWorld, entity: number, value: AsteroidAppearenceEnum) {
    addComponent(world, AsteroidAppearence, entity);
    AsteroidAppearence.value[entity] = value;
}
