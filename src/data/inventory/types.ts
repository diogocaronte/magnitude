import { Data } from '../types';

export type CreateInventoryDataProps = {
    entity: number;
};

export type ItemData = Data & {};

export type InventoryData = Data & {
    items: ItemData[];
};
