import { SpriteEnum } from '@/assets/sprite/types';
import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Sprite = defineComponent({
    index: Types.ui8,
    offsetX: Types.f32,
    offsetY: Types.f32,
    destinationW: Types.f32,
    destinationH: Types.f32,
});

export function addSprite(
    world: IWorld,
    entity: number,
    index: SpriteEnum,
    offsetX: number,
    offsetY: number,
    destinationW: number,
    destinationH: number,
) {
    addComponent(world, Sprite, entity);
    Sprite.index[entity] = index;
    Sprite.offsetX[entity] = offsetX;
    Sprite.offsetY[entity] = offsetY;
    Sprite.destinationW[entity] = destinationW;
    Sprite.destinationH[entity] = destinationH;
}
