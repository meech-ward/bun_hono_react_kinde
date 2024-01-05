import { z } from "zod"

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const expenseSchema = z.object({
  id: z.number(),
  category: z.number(),
  name: z.string(),
  date: z.string(),
  amount: z.number(),
  note: z.string().optional().nullable(),
});

type Expense = z.infer<typeof expenseSchema>;

export const categories = [
  // id, name
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transportation' },
  { id: 3, name: 'Entertainment' },
  { id: 4, name: 'Education' },
  { id: 5, name: 'Health' },
  { id: 6, name: 'Other' },
]

export const expenses: Expense[] = [
  // id, category, name, date, amount, note
  { id: 1, category: 1, name: 'Lunch', date: '2021-01-01', amount: 100, note: 'some note' },
  { id: 2, category: 2, name: 'Bus', date: '2021-01-01', amount: 50, note: 'some note' },
  { id: 3, category: 3, name: 'Movie', date: '2021-01-01', amount: 200, note: 'some note' },
  { id: 4, category: 4, name: 'Book', date: '2021-01-01', amount: 300, note: 'some note' },
  { id: 5, category: 5, name: 'Medicine', date: '2021-01-01', amount: 400, note: 'some note' },
  { id: 6, category: 6, name: 'Other', date: '2021-01-01', amount: 500, note: 'some note' },
  { id: 7, category: 1, name: 'Dinner', date: '2021-01-01', amount: 100, note: null },
]


