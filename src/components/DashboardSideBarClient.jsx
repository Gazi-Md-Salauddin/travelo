"use client"


import {
    Bars,
    Megaphone,
    Circles4Square,
    BookmarkFill,
    Person,
    Bookmark,
    Persons,
    ClockArrowRotateLeft,
    ChartLine,
    SquarePlus,
    Ticket,


} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from 'next/link'
import { usePathname } from "next/navigation";

const DashboardSideBarClient = ({ user }) => {

    const pathname = usePathname();


    const vendorNavLinks = [
        { icon: Person, href: "/dashboard/vendor/profile", label: "Profile" },
        { icon: SquarePlus, href: "/dashboard/vendor/tickets/new", label: "Add Ticket" },
        { icon: Ticket, href: "/dashboard/vendor/tickets", label: "My Added Tickets" },
        { icon: BookmarkFill, href: "/dashboard/vendor/requested-bookings", label: "Requested Bookings" },
        { icon: ChartLine, href: "/dashboard/vendor/revenue-overview", label: "Revenue Overview" },

    ];

    const userNavLinks = [
        { icon: Person, href: "/dashboard/user/profile", label: "Profile" },
        { icon: Bookmark, href: "/dashboard/user/booked-tickets", label: "My Booked Tickets" },
        { icon: ClockArrowRotateLeft, href: "/dashboard/user/transaction-history", label: "Transaction History" },

    ];

    const adminNavLinks = [
        { icon: Person, href: "/dashboard/admin/profile", label: "Profile" },
        { icon: Ticket, href: "/dashboard/admin/manage-tickets", label: "Manage Tickets" },
        { icon: Persons, href: "/dashboard/admin/manage-users", label: "Manage Users" },
        { icon: Megaphone, href: "/dashboard/admin/advertise-ticket", label: "Advertise Ticket" },

    ];

    const navLinksMap = {
        user: userNavLinks,
        vendor: vendorNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role || 'user'];


    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map(item => (
                <Link
                    key={item.label}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${pathname === item.href
                            ? "bg-blue-600 text-white"
                            : "text-foreground hover:bg-default"
                        }`}
                    type="button"
                    href={item.href}
                >
                    <item.icon className={`size-5 text-muted ${pathname === item.href
                            ? "text-white"
                            : "text-foreground hover:bg-default"
                        }`} />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className="hidden w-64 h-screen shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Dashboard</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>{navContent}</Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}
export default DashboardSideBarClient