import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { formatCurrency } from "@/lib/utils";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

export default function AllExpenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getAllExpenses"],
    queryFn: getAllExpenses,
  });

  console.log(data);

  return (
    <>
      <h1 className="text-2xl">All Expenses</h1>
      {error ? (
        "An error has occurred: " + error.message
      ) : (
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
              </TableRow>
            ) : (
              data.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>{expense.date.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
