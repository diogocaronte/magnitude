import { ISprite, SpriteEnum } from './types';

export const Sprites: ISprite[] = [];

const images = new Map();

function localImage(url: string) {
    if (images.has(url)) return images.get(url)!;

    const image = new Image();
    image.src = url;
    images.set(url, image);

    return image;
}

Sprites[SpriteEnum.SAMPLE] = {
    type: SpriteEnum.SAMPLE,
    name: 'Sample',
    image: localImage('/sprite-sample.png'),
    sourceX: 17,
    sourceY: 18,
    sourceW: 14,
    sourceH: 14,
};

Sprites[SpriteEnum.SAMPLE_2] = {
    type: SpriteEnum.SAMPLE_2,
    name: 'Sample_2',
    image: localImage('/sprite-sample.png'),
    sourceX: 17,
    sourceY: 34,
    sourceW: 14,
    sourceH: 14,
};

Sprites[SpriteEnum.SAMPLE_3] = {
    type: SpriteEnum.SAMPLE_3,
    name: 'Sample_3',
    image: localImage('/sprite-sample.png'),
    sourceX: 17,
    sourceY: 50,
    sourceW: 14,
    sourceH: 14,
};

Sprites[SpriteEnum.SAMPLE_4] = {
    type: SpriteEnum.SAMPLE_4,
    name: 'Sample_4',
    image: localImage('/sprite-sample.png'),
    sourceX: 17,
    sourceY: 66,
    sourceW: 14,
    sourceH: 14,
};
