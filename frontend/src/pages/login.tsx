import { Button } from "@/components/ui/button";
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
      <p className="text-xl">Please login to continue</p>
      <div className="mt-8 flex flex-col gap-y-4">
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
        <Button asChild>
          <a href="/register">Register</a>
        </Button>
      </div>
    </div>
  );
}
