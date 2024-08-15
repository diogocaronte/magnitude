export enum InventoryEnum {
    SMALL,
    MEDIUM,
    LARGE,
}

export type IInventory = {
    type: InventoryEnum;
    name: string;
    slots: number;
};
