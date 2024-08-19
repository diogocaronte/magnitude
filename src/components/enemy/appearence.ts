import { addComponent, defineComponent, IWorld, Types } from 'bitecs';
import { EnemyAppearenceEnum } from '../../assets/enemy/types';

export const EnemyAppearence = defineComponent({
    value: Types.ui8,
});

export function addEnemyAppearence(world: IWorld, entity: number, value: EnemyAppearenceEnum) {
    addComponent(world, EnemyAppearence, entity);
    EnemyAppearence.value[entity] = value;
}
