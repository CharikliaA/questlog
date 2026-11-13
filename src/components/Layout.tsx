import { Link, NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          🎮 Questlog
        </Link>
        <nav>
          <NavLink to="/" end>
            All games
          </NavLink>
          <NavLink to="/games/new">Add game</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
