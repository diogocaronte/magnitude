import { CreateCoreRenderSystemProps } from './types';

export function createCoreRenderSystem({ world }: CreateCoreRenderSystemProps) {
    return () => {
        const { camera, screen, viewport, pointer, mouse } = world;

        screen.context.imageSmoothingEnabled = false;
        if (!screen.isClientSize()) screen.toClientSize();

        viewport.x = camera.x;
        viewport.y = camera.y;
        viewport.scale = camera.scale;

        viewport.width = screen.texture.width * viewport.scale;
        viewport.height = screen.texture.height * viewport.scale;
        viewport.halfWidth = viewport.width / 2;
        viewport.halfHeight = viewport.height / 2;
        viewport.left = viewport.x - viewport.halfWidth;
        viewport.right = viewport.x + viewport.halfWidth;
        viewport.top = viewport.y - viewport.halfHeight;
        viewport.bottom = viewport.y + viewport.halfHeight;

        pointer.x = mouse.x + viewport.x - viewport.halfWidth;
        pointer.y = mouse.y + viewport.y - viewport.halfHeight;
    };
}
