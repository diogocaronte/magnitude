export enum ItemEnum {
    STONE,
    WATER,
    TITANIUM,
}

export type IItem = {
    type: ItemEnum;
    name: string;
    maxStack: number;
};
