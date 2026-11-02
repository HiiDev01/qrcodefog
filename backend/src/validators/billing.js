import { z } from 'zod';

export const checkoutSchema = z.object({ plan: z.enum(['pro', 'business'], { message: 'Choose Pro or Business.' }) });
