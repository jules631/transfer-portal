"use client";

import { PersonaBar } from "@/components/persona-bar";
import { Ribbon } from "@/components/ribbon";
import { EmployeeView } from "@/components/views/employee-view";
import { HRView } from "@/components/views/hr-view";
import { HiringManagerView } from "@/components/views/hiring-manager-view";
import { ManagerView } from "@/components/views/manager-view";
import { StoreProvider, useStore } from "@/lib/store";

function ActiveView() {
  const { state } = useStore();
  switch (state.persona) {
    case "maya":
      return <EmployeeView />;
    case "derek":
      return <HiringManagerView />;
    case "priya":
      return <ManagerView />;
    case "june":
      return <HRView />;
  }
}

export default function PortalPage() {
  return (
    <StoreProvider>
      <PersonaBar />
      <Ribbon />
      <main className="flex-1">
        <ActiveView />
      </main>
    </StoreProvider>
  );
}
