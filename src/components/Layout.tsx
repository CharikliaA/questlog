import { NavLink, Outlet } from "react-router";

export default function Layout() {
    return (
        <>
        <header>
            <nav>
                <NavLink to="/">Alla spel</NavLink>
                <NavLink to="/games/new">Lägg till spel</NavLink>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>
        </>
    )
}