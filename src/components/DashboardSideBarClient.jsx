"use client"

import {
    Bars,
    Megaphone,
    Circles4Square,
    BookmarkFill,
    Person,
    Rectangles4,
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
        { icon: Rectangles4, href: "/dashboard/vendor", label: "Overview" },
        { icon: Person, href: "/dashboard/vendor/profile", label: "Profile" },
        { icon: SquarePlus, href: "/dashboard/vendor/tickets/new", label: "Add Ticket" },
        { icon: Ticket, href: "/dashboard/vendor/tickets", label: "My Added Tickets" },
        { icon: BookmarkFill, href: "/dashboard/vendor/requested-bookings", label: "Requested Bookings" },
        { icon: ChartLine, href: "/dashboard/vendor/revenue-overview", label: "Revenue Overview" },
    ];

    const userNavLinks = [
        { icon: Rectangles4, href: "/dashboard/user", label: "Overview" },
        { icon: Person, href: "/dashboard/user/profile", label: "Profile" },
        { icon: Bookmark, href: "/dashboard/user/booked-tickets", label: "My Booked Tickets" },
        { icon: ClockArrowRotateLeft, href: "/dashboard/user/transaction-history", label: "Transaction History" },
    ];

    const adminNavLinks = [
        { icon: Rectangles4, href: "/dashboard/admin", label: "Overview" },
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

    const sidebarConfig = {
        admin: {
            title: "Admin Panel",
            subtitle: "Travelo Management",
            icon: Circles4Square,
        },
        vendor: {
            title: "Vendor Panel",
            subtitle: "Manage Your Business",
            icon: Ticket,
        },
        user: {
            title: "User Panel",
            subtitle: "Your Travel Space",
            icon: Person,
        },
    };

    const currentSidebar = sidebarConfig[user?.role || "user"];

    const SidebarHeader = () => {
        const Icon = currentSidebar.icon;

        return (
            <div className="px-2 pt-6 pb-5">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Icon className="size-6" />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-foreground">
                            {currentSidebar.title}
                        </h2>
                        <p className="text-xs text-default-500">
                            {currentSidebar.subtitle}
                        </p>
                    </div>
                </div>

            </div>
        );
    };


    const navContent = (
        <div className="flex flex-col">
            <SidebarHeader />

            <nav className="flex flex-col gap-1">
                {navItems.map(item => (
                    <Link
                        key={item.label}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${pathname === item.href
                            ? "bg-blue-600 text-white"
                            : "text-foreground hover:bg-default"
                            }`}
                        href={item.href}
                    >
                        <item.icon
                            className={`size-5 ${pathname === item.href
                                ? "text-white"
                                : "text-foreground"
                                }`}
                        />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );

    return (
        <>
            <div className="hidden w-64 shrink-0 border-r border-default px-4 pt-2 lg:block dark:bg-[#111827]">
                {navContent}
            </div>

            <div className="lg:hidden w-full px-4 py-3">
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
            </div>

        </>
    );
}
export default DashboardSideBarClient