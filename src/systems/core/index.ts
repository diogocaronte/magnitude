import { InventoryEnum } from '@/assets/inventory/types';
import { Inventory } from '@/components/inventory';
import { createInventoryData, InventoryData } from '@/data/inventory';
import { defineQuery } from 'bitecs';
import { CreateCoreProps } from './types';
import { createInitializeData } from './utils';

export function createCore({ world }: CreateCoreProps) {
    const initializeInventory = createInitializeData({
        componentRef: Inventory.index,
        query: defineQuery([Inventory]),
        data: InventoryData,
        factory: (entity: number) => createInventoryData({ entity, inventory: InventoryEnum.SMALL }),
    });

    return () => {
        initializeInventory(world.bitworld);
    };
}
