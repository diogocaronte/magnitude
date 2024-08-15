import { IItem, ItemEnum } from './types';

export const Items: IItem[] = [];

Items[ItemEnum.STONE] = {
    type: ItemEnum.STONE,
    name: 'Stone',
    maxStack: 64,
};

Items[ItemEnum.WATER] = {
    type: ItemEnum.WATER,
    name: 'Water',
    maxStack: 64,
};

Items[ItemEnum.TITANIUM] = {
    type: ItemEnum.TITANIUM,
    name: 'Titanium',
    maxStack: 12,
};
