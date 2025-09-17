"use client";

import { ChevronRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-white">
                {user?.role === "judge" ? "Categories" : "Results"}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const currentPath = new URL(window.location.href).pathname;
                    const isActive =
                        new URL(item.url, window.location.origin).pathname ===
                        currentPath;

                    return item.items && item.items.length > 0 ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        className={
                                            isActive
                                                ? "bg-white text-black rounded-md"
                                                : "hover:bg-white hover:text-black rounded-md"
                                        }
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => {
                                            const isSubActive =
                                                new URL(
                                                    subItem.url,
                                                    window.location.origin
                                                ).pathname === url;
                                            return (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link
                                                            href={subItem.url}
                                                            className={
                                                                isSubActive
                                                                    ? "bg-white text-black rounded-md"
                                                                    : "hover:bg-white hover:text-black rounded-md"
                                                            }
                                                        >
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                className={
                                    isActive
                                        ? "bg-white text-black rounded-md"
                                        : "hover:bg-white/20"
                                }
                            >
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
