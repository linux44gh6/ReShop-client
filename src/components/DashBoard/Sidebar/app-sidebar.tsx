"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"

import { NavUser } from "./nav-user"
import { useUser } from "@/Context/userContext"

// This is sample data.
const data = {
 
  teams: [
    {
      name: "ReShopp;.",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Product Management",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "/user/dashboard/products",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
    {
      title: "Transaction",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Purchases History",
          url: "#",
        },
        {
          title: "Sales History",
          url: "#",
        },
      ],
    },
    {
      title: "Wishlist",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Saved Product",
          url: "#",
        },
      ],
    },
   
  ],
 
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user=useUser()
    return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        {user.user && <NavUser user={user.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
