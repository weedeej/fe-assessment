"use client";

import { DatePicker } from "@/components"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ImagePreviewData } from "@/types";
import { useRef, useState } from "react";

export function AddContact() {
  const [lastContactDate, setLastContactDate] = useState<Date>();
  const [name, setName] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");
  const [imagePreviewData, setImagePreviewData] = useState<ImagePreviewData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddFileClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          fileName: file.name,
          dataUrl: e.target?.result as string,
        };
        setImagePreviewData(imageData);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create a New Contact
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-[#666666] font-semibold text-sm">Name</span>
            <Input value={name} onChange={handleNameChange} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#666666] font-semibold text-sm">Last Contact Date</span>
            <DatePicker value={lastContactDate} onChange={setLastContactDate} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#666666] font-semibold text-sm">Image</span>
            <div className="flex flex-row items-center gap-4">
              {imagePreviewData && (
                <Avatar>
                  <AvatarImage src={imagePreviewData.dataUrl} />
                </Avatar>
              )}
              <Button variant="outline" className="flex-1" onClick={handleAddFileClick}>{imagePreviewData ? imagePreviewData.fileName : "Add File"}</Button>
              <Input
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                className="hidden w-0" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row w-full">
            <Button type="submit">Save Contact</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
