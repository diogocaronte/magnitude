import { BulletCollision } from '@/components/bullet/collision';
import { CircleCollision } from '@/components/circle/collision';
import { EnemyCollision } from '@/components/enemy/collision';
import { HeroCollision } from '@/components/hero/collision';
import { Radius } from '@/components/radius';
import { Transform } from '@/components/transform';
import { BulletCollisionData, createBulletCollisionData } from '@/data/bullet';
import { CircleCollisionData, createCircleCollisionData } from '@/data/circle/collision';
import { createEnemyCollisionData, EnemyCollisionData } from '@/data/enemy/collision';
import { createHeroCollisionData, HeroCollisionData } from '@/data/hero/collision';
import { defineQuery, removeEntity } from 'bitecs';
import { createInitializeData } from '../core/utils';
import { CreateCollisionProps } from './types';

export function createCollision({ world }: CreateCollisionProps) {
    const circles = defineQuery([Transform, Radius, CircleCollision]);
    const enemies = defineQuery([Transform, Radius, EnemyCollision]);
    const bullets = defineQuery([Transform, Radius, BulletCollision]);

    const initializeCircleCollision = createInitializeData({
        componentRef: CircleCollision.index,
        query: defineQuery([Transform, Radius, CircleCollision]),
        data: CircleCollisionData,
        factory: (entity: number) => createCircleCollisionData({ entity, check: false }),
    });

    const initializeHeroCollision = createInitializeData({
        componentRef: HeroCollision.index,
        query: defineQuery([Transform, Radius, HeroCollision]),
        data: HeroCollisionData,
        factory: (entity: number) => createHeroCollisionData({ entity }),
    });

    const initializeEnemyCollision = createInitializeData({
        componentRef: EnemyCollision.index,
        query: defineQuery([Transform, Radius, EnemyCollision]),
        data: EnemyCollisionData,
        factory: (entity: number) => createEnemyCollisionData({ entity }),
    });

    const initializeBulletCollision = createInitializeData({
        componentRef: BulletCollision.index,
        query: defineQuery([Transform, Radius, BulletCollision]),
        data: BulletCollisionData,
        factory: (entity: number) => createBulletCollisionData({ entity }),
    });

    return () => {
        const { bitworld } = world;

        initializeCircleCollision(bitworld);
        initializeHeroCollision(bitworld);
        initializeEnemyCollision(bitworld);
        initializeBulletCollision(bitworld);

        for (const entity of circles(bitworld)) {
            const index = CircleCollision.index[entity];
            const data = CircleCollisionData[index];
            data.check = false;
        }

        const enemyList = enemies(bitworld);
        for (const bullet of bullets(bitworld)) {
            for (const enemy of enemyList) {
                if (bullet === enemy) continue;

                const diff_x = Transform.x[bullet] - Transform.x[enemy];
                const diff_y = Transform.y[bullet] - Transform.y[enemy];

                const radius = Radius.value[bullet] + Radius.value[enemy];
                if (Math.hypot(diff_x, diff_y) > radius) continue;

                const index = EnemyCollision.index[enemy];
                const data = EnemyCollisionData[index];
                data.hit = true;
            }
        }

        for (const enemy of enemyList) {
            const index = EnemyCollision.index[enemy];
            const data = EnemyCollisionData[index];

            if (data.hit) removeEntity(bitworld, enemy);
        }
    };
}
