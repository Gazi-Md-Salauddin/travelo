"use client"


import {
    Bars,
    Briefcase,
    FileText,
    Gear,
    Circles4Square,
    Factory,
    Person,
    Magnifier,
    House,
    Bookmark,
    CreditCard,
    Persons,
    
    
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from 'next/link'


const DashboardSideBarClient = ({user}) => {
  
    const vendorNavLinks = [
        { icon: Person, href: "/dashboard/vendor/profile", label: "Profile" },
        { icon: FileText, href: "/dashboard/vendor/tickets/new", label: "Add Ticket" },
        { icon: Briefcase, href: "/dashboard/vendor/tickets", label: "My Added Tickets" },
        { icon: Factory, href: "/dashboard/vendor/company", label: "Company Profile" },
        { icon: Gear, href: "/dashboard/vendor/settings", label: "Settings" }
    ];

  const userNavLinks = [
        { icon: House, href: "/dashboard/user", label: "Dashboard" },
        { icon: Person, href: "/dashboard/user/profile", label: "User Profile" },
        { icon: Bookmark, href: "/dashboard/user/booked-tickets", label: "My Booked Tickets" },
        { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

  const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Persons, href: "/dashboard/admin/manage-tickets", label: "Manage Tickets" },
        { icon: Factory, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

  const navLinksMap = {
        user: userNavLinks,
        vendor: vendorNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role || 'vendor'];


    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map(item => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                    href={item.href}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
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