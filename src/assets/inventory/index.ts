import { IInventory, InventoryEnum } from './types';

export const Inventories: IInventory[] = [];

Inventories[InventoryEnum.SMALL] = {
    type: InventoryEnum.SMALL,
    name: 'Small inventory',
    slots: 10,
};

Inventories[InventoryEnum.MEDIUM] = {
    type: InventoryEnum.MEDIUM,
    name: 'Medium inventory',
    slots: 20,
};

Inventories[InventoryEnum.LARGE] = {
    type: InventoryEnum.LARGE,
    name: 'Large inventory',
    slots: 30,
};
