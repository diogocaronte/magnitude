import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Size = defineComponent({
    width: Types.f32,
    height: Types.f32,
});

export function addSize(world: IWorld, entity: number, width: number, height: number) {
    addComponent(world, Size, entity);
    Size.width[entity] = width;
    Size.height[entity] = height;
}
