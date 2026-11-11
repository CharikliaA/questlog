import { NavLink, Outlet } from "react-router";

export default function Layout() {
    return (
        <>
        <header>
            <nav>
                <NavLink to="/">All games</NavLink>
                <NavLink to="/games/new">Add game</NavLink>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>
        </>
    )
}