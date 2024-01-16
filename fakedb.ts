import { z } from "zod"

export const expenseSchema = z.object({
  id: z.number(),
  title: z.string().min(3).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  amount: z.number().int().positive(),
  note: z.string().optional().nullable(),
});

type Expense = z.infer<typeof expenseSchema>;

export const expenses: Expense[] = [
  { id: 1, title: 'Lunch', date: '2021-01-01', amount: 100, note: 'some note' },
  { id: 2, title: 'Bus', date: '2021-01-01', amount: 50, note: 'some note' },
  { id: 3, title: 'Movie', date: '2021-01-01', amount: 200, note: 'some note' },
  { id: 4, title: 'Book', date: '2021-01-01', amount: 300, note: 'some note' },
  { id: 5, title: 'Medicine', date: '2021-01-01', amount: 400, note: 'some note' },
  { id: 6, title: 'Other', date: '2021-01-01', amount: 500, note: 'some note' },
  { id: 7, title: 'Dinner', date: '2021-01-01', amount: 100, note: null },
]


