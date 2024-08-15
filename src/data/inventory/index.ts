import { Inventories } from '../../assets/inventory';
import { ItemEnum } from '../../assets/item/types';
import { DataTypeEnum } from '../types';
import { InvalidAmount } from './errors';
import { addStackAmount, createStackData, removeStackAmount } from './stack';
import { CreateInventoryDataProps, InventoryData, StackData } from './types';

export function createInventoryData({ entity, inventory }: CreateInventoryDataProps): InventoryData {
    return {
        type: DataTypeEnum.INVENTORY,
        inventory,
        entity,
        stacks: [],
    };
}

export function getAvailableInInventory(inventoryData: InventoryData) {
    return Inventories[inventoryData.inventory].slots - inventoryData.stacks.length;
}

export function addInventoryStack(inventoryData: InventoryData, stack: StackData) {
    if (getAvailableInInventory(inventoryData) === 0) return false;
    inventoryData.stacks.push(stack);
    return true;
}

export function removeInventoryStack(inventoryData: InventoryData, stack: StackData) {
    const index = inventoryData.stacks.indexOf(stack);
    if (index === -1) return false;

    inventoryData.stacks.splice(index, 1);
    return true;
}

export function addInventoryItem(inventoryData: InventoryData, item: ItemEnum, amount: number) {
    if (amount < 0) throw new InvalidAmount(amount);

    const stacks = inventoryData.stacks.filter((stack) => stack.item === item);

    for (const stack of stacks) {
        amount = addStackAmount(stack, amount);
        if (amount === 0) return 0;
    }

    while (amount > 0) {
        const stack = createStackData({ item });
        const added = addInventoryStack(inventoryData, stack);
        if (!added) return amount;

        amount = addStackAmount(stack, amount);
    }

    return 0;
}

export function removeInventoryItem(inventoryData: InventoryData, item: ItemEnum, amount: number) {
    if (amount < 0) throw new InvalidAmount(amount);

    const stacks = inventoryData.stacks.filter((stack) => stack.item === item);

    for (const stack of stacks) {
        amount = removeStackAmount(stack, amount);
        if (stack.amount === 0) removeInventoryStack(inventoryData, stack);
        if (amount === 0) return 0;
    }

    return amount;
}
