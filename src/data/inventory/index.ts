import { DataTypeEnum } from '../enums';
import { CreateInventoryDataProps, InventoryData } from './types';

export function createInventoryData({ entity }: CreateInventoryDataProps): InventoryData {
    return {
        type: DataTypeEnum.INVENTORY,
        entity,
        items: [],
    };
}
