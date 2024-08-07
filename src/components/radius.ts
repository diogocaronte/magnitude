import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Radius = defineComponent({
    value: Types.f32,
});

export function addRadius(world: IWorld, entity: number, value: number) {
    addComponent(world, Radius, entity);
    Radius.value[entity] = value;
}
