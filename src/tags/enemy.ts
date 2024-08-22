import { addComponent, defineComponent, IWorld } from 'bitecs';

export const EnemyTag = defineComponent();

export function addEnemyTag(world: IWorld, entity: number) {
    addComponent(world, EnemyTag, entity);
}
