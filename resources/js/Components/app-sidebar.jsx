import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/team-switcher"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"


// Sidebar static data (teams, nav)
const data = {
  teams: [
    { name: "PITON", logo: "LogoPlaceholder", plan: "Philippine Information Technology of the North" },
  ],
navMain: [
    { title: "School Uniform", url: route("school_uniform") },
    { title: "Sports", url: route("sports") },
    { title: "SPTVE", url: route("sptve") },
    { title: "Filipiniana / Barong", url: route("filipiniana_barong") },
    { title: "Q & A", url: route("q_and_a") },
    { title: "Stage Presence", url: route("stage_presence") },
    { title: "Result", url: route("result") },
  ],
}

const AppSidebar = ({ user, ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className= "text-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
