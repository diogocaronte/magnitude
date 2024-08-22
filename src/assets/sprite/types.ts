export enum SpriteEnum {
    SAMPLE,
    SAMPLE_2,
    SAMPLE_3,
    SAMPLE_4,
}

export type ISprite = {
    type: SpriteEnum;
    name: string;
    image: HTMLImageElement;
    sourceX: number;
    sourceY: number;
    sourceW: number;
    sourceH: number;
};
