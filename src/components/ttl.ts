import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const TTL = defineComponent({
    value: Types.f32,
});

export function addTTL(world: IWorld, entity: number, value: number) {
    addComponent(world, TTL, entity);
    TTL.value[entity] = value;
}
