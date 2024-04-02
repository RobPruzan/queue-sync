import { App } from '@fireside/backend';
import { treaty } from '@elysiajs/eden';

export const client = treaty<App>('localhost:8080');
