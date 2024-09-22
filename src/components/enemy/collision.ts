import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const EnemyCollision = defineComponent({
    index: Types.ui32,
});

export function addEnemyCollision(world: IWorld, entity: number) {
    addComponent(world, EnemyCollision, entity);
    EnemyCollision.index[entity] = 0;
}
