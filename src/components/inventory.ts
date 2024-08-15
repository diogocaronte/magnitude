import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Inventory = defineComponent({
    index: Types.ui16,
});

export function addInventory(world: IWorld, entity: number) {
    addComponent(world, Inventory, entity);
    Inventory.index[entity] = 0;
}
