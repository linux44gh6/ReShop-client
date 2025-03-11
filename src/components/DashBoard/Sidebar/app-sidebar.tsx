"use client"
 import { UserIcon } from "lucide-react"
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


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user=useUser()
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
            url: `/${user.user?.role}/dashboard/products`,
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
            title: "Transaction History",
            url: `/${user.user?.role}/dashboard/transactions`,
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
            url: `/${user.user?.role}/dashboard/wishlist`,
          },
        ],
      },
     
    ],
   
  }
  const Admindata = {
    teams: [
      {
        name: "ReShopp;.",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
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
            url: `/${user.user?.role}/dashboard/products`,
          },
          {
            title: "Categories",
            url: `/${user.user?.role}/dashboard/categories`,
          },
        ],
      },
      {
        title: "Users",
        url: "#",
        icon: UserIcon,
        items: [
          {
            title: "Users",
            url: `/${user.user?.role}/dashboard/users`,
          },
        ],
      },
      {
        title: "Transactions",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "All Transactions",
            url: `/${user.user?.role}/dashboard/transactions`,
          },
        ],
      },
     
    ],
   
  }

    return (
    <Sidebar collapsible="icon" {...props}>
      
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {user.user?.role==="admin"?<NavMain items={Admindata.navMain} />:
  <NavMain items={data.navMain} />
        }
        
      </SidebarContent>
      <SidebarFooter>
        {user.user && <NavUser user={user.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
