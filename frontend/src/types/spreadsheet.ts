import z from 'zod';

export const SpreadsheetSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: z.string().array(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Spreadsheet = z.infer<typeof SpreadsheetSchema>;
