import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <h1>404 - Page not found</h1>
      <Link to="/">Back to all games</Link>
    </>
  );
}
