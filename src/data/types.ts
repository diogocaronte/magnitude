export enum DataTypeEnum {
    CIRCLE_QUADTREE,
    CIRCLE_COLLISION,
    HERO_COLLISION,
    ENEMY_COLLISION,
    BULLET_COLLISION,
    INVENTORY,
}

export type IData = {
    type: DataTypeEnum;
    entity: number;
};
