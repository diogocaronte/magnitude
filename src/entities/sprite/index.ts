import { addSprite } from '@/components/sprite';
import { addTransform } from '@/components/transform';
import { addEntity, IWorld } from 'bitecs';
import { SpriteProps } from './types';

export function createSprite(world: IWorld, { x = 0, y = 0, angle = 0, w = 32, h = 32, sprite } = {} as SpriteProps) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addSprite(world, entity, sprite, -w / 2, -h / 2, w, h);

    return entity;
}
