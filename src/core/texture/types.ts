export type TextureCanvas = OffscreenCanvas | HTMLCanvasElement;
export type TextureContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

export type ResizeProps = {
    width: number;
    height: number;
};

export type ResizeCallback = (props: ResizeProps) => void;
