import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome to the About page!</p>
    </div>
  );
}
