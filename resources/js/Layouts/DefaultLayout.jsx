import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Container from "@/Components/Container.jsx";
import GuestMenu from "@/Menus/GuestMenu.jsx";
import UserMenu from "@/Menus/UserMenu.jsx";

export default function DefaultLayout({ user = null, children }) {
    return (
        <div className="h-screen flex flex-col">
            <header className="bg-red-300 p-2">
                <Container>
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <div>
                            <Link href="/">
                                <ApplicationLogo className="w-12 h-12 fill-white text-gray-500"/>
                            </Link>
                        </div>
                        <div className="flex justify-end text-black">
                            {user ?
                                <UserMenu user={user}/>
                                :
                                <GuestMenu />
                            }
                        </div>
                    </div>
                </Container>
            </header>
            <main className="flex-grow bg-gray-50 pt-4 pb-4">
                <Container>
                    {children}
                </Container>
            </main>
            <footer className="bg-red-300 p-3 text-center">
                <Container>
                    <p>&copy; 2024</p>
                </Container>
            </footer>
        </div>
    );
}
