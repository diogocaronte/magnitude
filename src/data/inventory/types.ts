import { InventoryEnum } from '@/assets/inventory/types';
import { ItemEnum } from '@/assets/item/types';
import { IData } from '../types';

export type CreateInventoryDataProps = {
    entity: number;
    inventory: InventoryEnum;
};

export type IInventoryData = IData & {
    inventory: InventoryEnum;
    stacks: StackData[];
};

export type CreateStackDataProps = {
    item: ItemEnum;
};

export type StackData = {
    item: ItemEnum;
    amount: number;
};
