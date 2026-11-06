import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from "next/navigation";

export default function CustomTrigger() {

    const { data: session, isPending } = useSession();

    const user = session?.user

    const router = useRouter();

    const handleSignOut = async () => {
        await signOut()
        router.refresh()
    }

    const dashboardLinks = {
        user: '/dashboard/user',
        vendor: '/dashboard/vendor',
        admin: '/dashboard/admin'
    }

    const handleDashboard = () => {
        const role = user?.role || 'user';
        router.push(dashboardLinks[role]);
    };

    return (
        <Dropdown>
            <Dropdown.Trigger className="rounded-full">
                <Avatar>
                    <Avatar.Image
                        alt={user.name}
                        src={user.image}
                    />
                    <Avatar.Fallback delayMs={600}>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm">
                            <Avatar.Image
                                alt={user.name}
                                src={user.image}
                            />
                            <Avatar.Fallback delayMs={600}>{user.name.charAt(0)}</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                            <p className="text-sm leading-5 font-medium">{user.name}</p>
                            <p className="text-xs leading-none text-muted">{user.email}</p>
                        </div>
                    </div>
                </div>
                <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard" onClick={handleDashboard}>
                        <Label>Dashboard</Label>
                    </Dropdown.Item>

                    <Dropdown.Item id="logout" textValue="Logout" variant="danger" onClick={handleSignOut}>
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label>Log Out</Label>
                            <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}