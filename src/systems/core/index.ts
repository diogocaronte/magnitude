import { defineQuery, IWorld } from 'bitecs';
import { InventoryEnum } from '../../assets/inventory/types';
import { Inventory } from '../../components/inventory';
import { createInventoryData, InventoryData } from '../../data/inventory';
import { createInitializeData } from './utils';

export function createCore(world: IWorld) {
    const initializeInventory = createInitializeData({
        componentRef: Inventory.index,
        query: defineQuery([Inventory]),
        data: InventoryData,
        factory: (entity: number) => createInventoryData({ entity, inventory: InventoryEnum.SMALL }),
    });

    return () => {
        initializeInventory(world);
    };
}
