import NavLink from "@/Components/NavLink.jsx";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import {Link} from "@inertiajs/react";

export default function GuestMenu() {
    return (
        <nav className="flex gap-5 text-black dark:text-black">
            <Link href={route('login')}>
                Log in
            </Link>
            <Link href={route('register')}>
                Register
            </Link>
        </nav>
    );
}
