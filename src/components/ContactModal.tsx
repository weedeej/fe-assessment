"use client";
import { UserContact } from "@/types";
import { DatePicker, Spinner } from "@/components"
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
import { db, storage } from "@/firebase/config";
import { ImagePreviewData } from "@/types";
import { Timestamp, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";

type ContactModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contact?: UserContact;
};

export function ContactModal(props: ContactModalProps) {
  const { isOpen, onOpenChange, contact } = props;
  const [lastContactDate, setLastContactDate] = useState<Date>();
  const [name, setName] = useState<string>("");
  const [imagePreviewData, setImagePreviewData] = useState<ImagePreviewData | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationMessage, setValidationMessage] = useState<Record<"name" | "image" | "lastContactDate", string>>({
    name: "",
    image: "",
    lastContactDate: "",
  });

  useEffect(() => {
    if (!contact) return;
    const fileRef = ref(storage, contact.imagePath);
    getDownloadURL(fileRef).then((url) => {
      setImagePreviewData({
        dataUrl: url,
      });
    });
    setName(contact.name);
    setLastContactDate(new Date((contact.lastContactDate as Timestamp).seconds * 1000));
  }, [contact]);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValidationMessage((prev) => ({ ...prev, name: "" }));
    setName(event.target.value);
  }

  function handleAddFileClick() {
    setValidationMessage((prev) => ({ ...prev, image: "" }));
    fileInputRef.current?.click();
  }

  function handleLastContactDateChange(date?: Date) {
    setValidationMessage((prev) => ({ ...prev, lastContactDate: "" }));
    setLastContactDate(date);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          fileName: file.name,
          dataUrl: e.target?.result as string,
          file,
        };
        setImagePreviewData(imageData);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit() {
    if (!imagePreviewData) return setValidationMessage((prev) => ({ ...prev, image: "Please select an image" }));
    if (!name) return setValidationMessage((prev) => ({ ...prev, name: "Please enter a name" }));
    if (!lastContactDate) return setValidationMessage((prev) => ({ ...prev, lastContactDate: "Please select a date" }));
    const docRef = contact ? doc(db, "contacts", contact._id) : doc(collection(db, "contacts"));
    const fileExtension = imagePreviewData?.fileName?.split(".").pop();
    setIsSubmitLoading(true);
    if (imagePreviewData.file) {
      const fileRef = ref(storage, `/avatars/${docRef.id}.${fileExtension}`);
      await uploadBytes(fileRef, imagePreviewData.file!);
    }
    const newContact = {
      _id: docRef.id,
      name,
      lastContactDate,
      imagePath: contact?.imagePath ?? `/avatars/${docRef.id}.${fileExtension}`,
    };
    await setDoc(docRef, newContact, { merge: true });
    setIsSubmitLoading(false);
    handleOpenChange(false);
  }

  async function handleDelete() {
    if (!contact) return;
    setIsDeleting(true);
    const docRef = doc(db, "contacts", contact._id);
    const fileRef = ref(storage, contact.imagePath);
    await deleteObject(fileRef);
    await deleteDoc(docRef);
    setIsDeleting(false);
    handleOpenChange(false);
  }

  function resetForm() {
    setName("");
    setLastContactDate(undefined);
    setImagePreviewData(null);
    setValidationMessage({
      name: "",
      image: "",
      lastContactDate: "",
    });
  }

  function handleOpenChange(open: boolean) {
    resetForm();
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {contact ? "Edit Contact" : "Create a New Contact"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-[#666666] font-semibold text-sm">Name</span>
            <Input value={name} onChange={handleNameChange} />
            {validationMessage.name && <span className="text-red-500 text-sm">{validationMessage.name}</span>}
          </div>
          <div className="flex flex-col">
            <span className="text-[#666666] font-semibold text-sm">Last Contact Date</span>
            <DatePicker value={lastContactDate} onChange={handleLastContactDateChange} />
            {validationMessage.lastContactDate && <span className="text-red-500 text-sm">{validationMessage.lastContactDate}</span>}
          </div>
          <div className="flex flex-col">
            <span className="text-[#666666] font-semibold text-sm">Image</span>
            <div className="flex flex-row items-center gap-4">
              {imagePreviewData && (
                <Avatar>
                  <AvatarImage src={imagePreviewData.dataUrl} />
                </Avatar>
              )}
              <Button variant="outline" className="flex-1" onClick={handleAddFileClick}>
                {(imagePreviewData && imagePreviewData.fileName) ? imagePreviewData.fileName : "Add File"}
              </Button>
              <Input
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                className="hidden w-0" />
            </div>
            {validationMessage.image && <span className="text-red-500 text-sm">{validationMessage.image}</span>}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row w-full justify-between">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitLoading}>
              {isSubmitLoading && <Spinner />} {contact ? "Update Contact" : "Save Contact"}
            </Button>
            {
              contact && (
                <Button size="icon" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  <TrashIcon />
                </Button>
              )
            }
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
