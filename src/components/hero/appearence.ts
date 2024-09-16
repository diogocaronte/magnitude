import { HeroAppearenceEnum } from '@/assets/hero/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const HeroAppearence = defineComponent({
    value: Types.ui8,
});

export function addHeroAppearence(world: IWorld, entity: number, value: HeroAppearenceEnum) {
    addComponent(world, HeroAppearence, entity);
    HeroAppearence.value[entity] = value;
}
