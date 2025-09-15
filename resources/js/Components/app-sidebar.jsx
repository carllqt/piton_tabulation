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
    { title: "Result Per Judges", url: route("result_by_judges") },
    { title: "Result", url: route("result") },
  ],
}

const AppSidebar = ({ user, ...props }) => {
  // Filter navMain items if user is a judge
  const navItems = user?.role === "judge"
    ? data.navMain.filter(item => item.title !== "Result" && item.title !== "Result Per Judges")
    : user?.role === "admin"
      ? data.navMain.filter(item => item.title === "Result" || item.title === "Result Per Judges")
      : data.navMain;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="text-white">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
