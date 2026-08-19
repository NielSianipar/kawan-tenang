"use client";

import { useAppStore } from "@/lib/store";
import { CrisisModal } from "@/components/emergency/CrisisModal";

export function GlobalCrisisHandler() {
  const isOpen = useAppStore((s) => s.isEmergencyModalOpen);
  const severity = useAppStore((s) => s.emergencySeverity);
  const closeModal = useAppStore((s) => s.closeEmergencyModal);

  return (
    <CrisisModal
      open={isOpen}
      severity={severity}
      onContinueAnyway={closeModal}
      onClose={closeModal}
    />
  );
}
