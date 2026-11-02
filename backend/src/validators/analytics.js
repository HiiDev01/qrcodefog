import { z } from 'zod';

// Browser's Date.getTimezoneOffset() (minutes behind UTC). Lets "today" match the viewer's local day.
export const tzSchema = z.object({ tzOffset: z.coerce.number().int().min(-840).max(840).default(0) });
