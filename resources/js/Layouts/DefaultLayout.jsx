import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Container from "@/Components/Container.jsx";
import GuestMenu from "@/Menus/GuestMenu.jsx";
import UserMenu from "@/Menus/UserMenu.jsx";
import {globalBackgroundStyle, mainBackgroundStyle, mainTextColor} from "@/variables.js";
import {SearchInput} from "@/Layouts/SearchInput.jsx";

const DefaultLayout = ({ user = null, children }) => {
    return (
        <div className="h-screen flex flex-col">
            <header className={"p-2 " + globalBackgroundStyle}>
                <Container>
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <div>
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <div className="flex justify-end">
                            <SearchInput className={"min-w-[400px] mr-10"}/>
                            {user ?
                                <UserMenu user={user}/>
                                :
                                <GuestMenu />
                            }
                        </div>
                    </div>
                </Container>
            </header>
            <main className={"flex-grow pt-0 pb-0 " + mainBackgroundStyle + " " + mainTextColor}>
                <Container className={"pt-10 pb-10"}>
                    {children}
                </Container>
            </main>
            <footer className={"p-3 text-center " + globalBackgroundStyle + " " + mainTextColor}>
                <Container>
                    <p>&copy; 2024</p>
                </Container>
            </footer>
        </div>
    );
}

const SidebarLayout = ({children}) => {
    return (
        <div className="flex justify-between lg:flex-row flex-col">
            {children}
        </div>
    )
}

const Main = ({children}) => {
    return (
        <div className="lg:w-[75%] sm:w-full">
            {children}
        </div>
    )
}

const Sidebar = ({children}) => {
    return (
        <div className="lg:w-[20%] w-full mx-auto">
            {children}
        </div>
    )
}

const CenteredBlock = ({children, className = ''}) => {
    return (
        <div className={"max-w-[600px] mx-auto " + className}>
            {children}
        </div>
    )
}

DefaultLayout.SidebarLayout = SidebarLayout;
DefaultLayout.Main = Main;
DefaultLayout.Sidebar = Sidebar;
DefaultLayout.CenteredBlock = CenteredBlock;

export default DefaultLayout;
