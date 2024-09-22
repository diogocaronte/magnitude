import { CircleAppearenceEnum } from '@/assets/circle/types';
import { addBulletCollision } from '@/components/bullet/collision';
import { addCircleAppearence } from '@/components/circle/appearence';
import { addRadius } from '@/components/radius';
import { addTransform } from '@/components/transform';
import { addVelocity } from '@/components/velocity';
import { addEntity, IWorld } from 'bitecs';
import { BulletProps } from './types';

export function createBullet(
    world: IWorld,
    { x = 0, y = 0, angle = 0, vx = 0, vy = 0, radius = 2, appearence = CircleAppearenceEnum.BULLET } = {} as BulletProps,
) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addVelocity(world, entity, vx, vy);
    addRadius(world, entity, radius);
    addCircleAppearence(world, entity, appearence);
    addBulletCollision(world, entity);

    return entity;
}
