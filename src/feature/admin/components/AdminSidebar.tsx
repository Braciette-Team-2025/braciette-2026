"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  FilePlusCorner,
  Vote,
  BookOpen,
  LucideIcon,
  UserRound,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export function AdminSidebar() {
  const pathname = usePathname();
  interface SidebarCategory {
    id: number;
    title: string;
    href: string;
    icon: LucideIcon;
  }
  const SidebarCategories: SidebarCategory[] = [
    {
      id: 1,
      title: "Submission",
      href: "/admin/submission",
      icon: FilePlusCorner,
    },
    { id: 2, title: "Voting", href: "/admin/voting", icon: Vote },
    { id: 3, title: "Open Talent", href: "/admin/open-talent", icon: BookOpen },
  ];
  return (
    <Sidebar className="font-inter text-yellow-500 h-full border-r border-blue-400">
      <SidebarHeader className="py-6 px-8 border-b border-blue-400 bg-blue-900">
        <div>
          <h1 className="text-h5 font-black">Admin Panel</h1>
          <p className="text-body font-bold">
            Brawijaya Festival Appreciate 2026
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-8 border-b border-blue-400 bg-blue-900">
        <SidebarGroup />
        <SidebarMenu className="gap-2">
          <p className="px-4 text-s1 font-semibold">OVERVIEW</p>
          {SidebarCategories.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  className="
                  px-4 py-6 text-body! font-medium
                   data-[active=true]:bg-blue-600
                   data-[active=true]:text-inherit hover:bg-blue-600 hover:text-yellow-500
                   "
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="w-10 h-10" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-blue-800 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="bg-yellow-500 rounded-full p-2 w-fit h-fit flex  justify-center">
              <UserRound className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <p className="font-medium text-yellow-500 text-body">
                Admin Utama
              </p>
              <p className="text-xs text-yellow-300">Administrator</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="flex gap-1 bg-inherit text-yellow-500 hover:bg-blue-500">
              <LogOut className="h-4 w-4" />
              <p>Keluar</p>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
