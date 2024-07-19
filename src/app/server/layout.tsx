import SidebarAction from '@/components/sidebar/SidebarAction';
import React from 'react';

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SidebarAction />
      <main className=" flex-1">{children}</main>
    </div>
  );
}