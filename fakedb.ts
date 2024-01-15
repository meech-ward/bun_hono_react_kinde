import { z } from "zod"

export const categorySchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const expenseSchema = z.object({
  id: z.number(),
  category: z.number(),
  title: z.string().min(3).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  amount: z.number().int().positive(),
  note: z.string().optional().nullable(),
});

type Expense = z.infer<typeof expenseSchema>;

export const categories = [
  // id, title
  { id: 1, title: 'Food' },
  { id: 2, title: 'Transportation' },
  { id: 3, title: 'Entertainment' },
  { id: 4, title: 'Education' },
  { id: 5, title: 'Health' },
  { id: 6, title: 'Other' },
]

export const expenses: Expense[] = [
  // id, category, title, date, amount, note
  { id: 1, category: 1, title: 'Lunch', date: '2021-01-01', amount: 100, note: 'some note' },
  { id: 2, category: 2, title: 'Bus', date: '2021-01-01', amount: 50, note: 'some note' },
  { id: 3, category: 3, title: 'Movie', date: '2021-01-01', amount: 200, note: 'some note' },
  { id: 4, category: 4, title: 'Book', date: '2021-01-01', amount: 300, note: 'some note' },
  { id: 5, category: 5, title: 'Medicine', date: '2021-01-01', amount: 400, note: 'some note' },
  { id: 6, category: 6, title: 'Other', date: '2021-01-01', amount: 500, note: 'some note' },
  { id: 7, category: 1, title: 'Dinner', date: '2021-01-01', amount: 100, note: null },
]


