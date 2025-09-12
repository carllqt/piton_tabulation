import React from 'react'
import { usePage } from "@inertiajs/react"
import { PageLayout } from '@/Layouts/PageLayout'

export default function Dashboard() {
  const user = usePage().props.auth?.user

  const breadcrumbs = [
    { label: "Building Your Application", href: "#" },
  ]

  return (
    <PageLayout user={user} breadcrumbs={breadcrumbs}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </PageLayout>
  )
}
