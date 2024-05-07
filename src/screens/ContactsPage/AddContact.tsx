"use client";

import { ContactModal } from "@/components";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AddContact() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleAddContactClick() {
    setIsModalOpen(true);
  }

  function onOpenChange(open: boolean) {
    setIsModalOpen(open);
  }
  return (<>
    <Button onClick={handleAddContactClick}>+ Add Contact</Button>
    <ContactModal isOpen={isModalOpen} onOpenChange={onOpenChange} />
  </>)
}