import { defineQuery, IWorld } from 'bitecs';
import { InventoryEnum } from '../../assets/inventory/types';
import { Inventory } from '../../components/inventory';
import { createInventoryData } from '../../data/inventory';
import { createInitializeData } from './utils';

export function createCore(world: IWorld) {
    const inventory = defineQuery([Inventory]);

    const initializeInventory = createInitializeData({
        componentRef: Inventory.index,
        query: inventory,
        data: [],
        factory: (entity: number) => createInventoryData({ entity, inventory: InventoryEnum.SMALL }),
    });

    return () => {
        initializeInventory(world);
    };
}
