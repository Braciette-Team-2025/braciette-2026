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
    <Sidebar className="font-inter text-[#808080] h-full">
      <SidebarHeader className="py-6 px-8 border-b border-gray-400">
        <div>
          <h1 className="text-[24px] font-black">Admin Panel</h1>
          <p className="text-[16px] font-bold">
            Brawijaya Festival Appreciate 2026
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-8">
        <SidebarGroup />
        <SidebarMenu className="gap-2">
          <p className="px-4 text-[12px] font-semibold">OVERVIEW</p>
          {SidebarCategories.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="px-4 py-3 text-[16px] font-medium">
                    <Icon className="w-8 h-8" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-gray-200 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="bg-gray-500 rounded-full p-2 w-fit h-fit flex  justify-center">
              <UserRound className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="font-medium text-black">Admin Utama</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="flex gap-1 bg-inherit text-gray-600">
              <LogOut className="h-4 w-4" />
              <p className="text-base">Keluar</p>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
