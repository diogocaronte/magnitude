import { EnemyAppearenceEnum } from '@/assets/enemy/types';
import { addEnemyAppearence } from '@/components/enemy/appearence';
import { addHealth } from '@/components/health';
import { addPosition } from '@/components/position';
import { addRadius } from '@/components/radius';
import { addEntity, IWorld } from 'bitecs';
import { EnemyProps } from './types';

export function createEnemy(
    world: IWorld,
    { x = 0, y = 0, radius = 20, appearence = EnemyAppearenceEnum.GREY, value = 0, maximum = 100 }: Partial<EnemyProps> = {},
) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addRadius(world, entity, radius);
    addEnemyAppearence(world, entity, appearence);
    addHealth(world, entity, value, maximum);

    return entity;
}
