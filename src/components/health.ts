import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Health = defineComponent({
    value: Types.f32,
    maximum: Types.f32,
});

export function addHealth(world: IWorld, entity: number, value: number, maximum: number) {
    addComponent(world, Health, entity);
    Health.value[entity] = value;
    Health.maximum[entity] = maximum;
}

export function heal(entity: number, amount: number) {
    const available = Health.maximum[entity] - Health.value[entity];
    const add = Math.min(amount, available);
    Health.value[entity] += add;
}

export function damage(entity: number, amount: number) {
    const available = Health.value[entity];
    const remove = Math.min(amount, available);
    Health.value[entity] -= remove;
}
