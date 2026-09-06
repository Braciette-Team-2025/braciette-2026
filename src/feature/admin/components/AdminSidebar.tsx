"use client";

import { usePathname, useRouter } from "next/navigation";
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
import { useAuthStore } from "../../auth/store/authStore";

interface SidebarCategory {
  id: number;
  title: string;
  href: string;
  icon: LucideIcon;
}

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  const SidebarCategories: SidebarCategory[] = [
    {
      id: 1,
      title: "Submission",
      href: "/admin/submission",
      icon: FilePlusCorner,
    },
    {
      id: 2,
      title: "Voting",
      href: "/admin/voting",
      icon: Vote,
    },
    {
      id: 3,
      title: "Open Talent",
      href: "/admin/open-talent",
      icon: BookOpen,
    },
  ];

  const handleLogout = async () => {
    await logout();

    router.replace("/login/ormawa");
  };

  return (
    <Sidebar className="h-full border-r border-blue-400 font-inter text-yellow-500">
      <SidebarHeader className="border-b border-blue-400 bg-blue-900 px-8 py-6">
        <div>
          <h1 className="text-h5 font-black">Admin Panel</h1>
          <p className="text-body font-bold">
            Brawijaya Festival Appreciate 2026
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="border-b border-blue-400 bg-blue-900 p-8">
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
                    data-[active=true]:text-inherit
                    hover:bg-blue-600
                    hover:text-yellow-500
                  "
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="h-10 w-10" />
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
          <div className="flex items-center gap-3">
            <div className="flex h-fit w-fit justify-center rounded-full bg-yellow-500 p-2">
              <UserRound className="h-8 w-8 text-yellow-100" />
            </div>

            <div>
              <p className="text-body font-medium text-yellow-500">
                Admin Utama
              </p>
              <p className="text-xs text-yellow-300">Administrator</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex gap-1 bg-inherit text-yellow-500 hover:bg-blue-500"
            >
              <LogOut className="h-4 w-4" />
              <p>{isLoading ? "Keluar..." : "Keluar"}</p>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
