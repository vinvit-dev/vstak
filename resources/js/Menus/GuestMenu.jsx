import NavLink from "@/Components/NavLink.jsx";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import {Link} from "@inertiajs/react";

export default function GuestMenu() {
    return (
        <nav className="flex gap-5 text-black dark:text-black">
            <NavLink href={route('login')} active={route().current() === 'login'}>
                Log in
            </NavLink>
            <NavLink href={route('register')} active={route().current() === 'register'}>
                Sing up
            </NavLink>
        </nav>
    );
}
