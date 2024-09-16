import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const HeroCollision = defineComponent({
    index: Types.ui32,
});

export function addHeroCollision(world: IWorld, entity: number) {
    addComponent(world, HeroCollision, entity);
    HeroCollision.index[entity] = 0;
}
