"use client";

import { storage } from "@/firebase/config";
import { UserContact } from "@/types";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Timestamp } from "firebase/firestore";

const dateTimeFormat = new Intl.DateTimeFormat("en", {year: "numeric", month: "long", day: "numeric"}).format;

type ContactCardProps = {
  contact: UserContact;
  onContactClick: (contact: UserContact) => void;
};
export function ContactCard(props: ContactCardProps) {
  const {contact, onContactClick} = props;
  const {name, lastContactDate, imagePath} = contact;
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fileRef = ref(storage, imagePath);
    getDownloadURL(fileRef).then((url) => {
      setImageUrl(url);
    });
  }, []);

  return (
    <div
      onClick={() => onContactClick(contact)}
      className="rounded border flex flex-row p-4 items-center justify-between cursor-pointer hover:border-blue-500">
      <div className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={imageUrl} />
        </Avatar>
        <span className="text-lg">{name}</span>
      </div>
      <span className="text-lg">{dateTimeFormat((lastContactDate as Timestamp).seconds * 1000)}</span>
    </div>
  )
}