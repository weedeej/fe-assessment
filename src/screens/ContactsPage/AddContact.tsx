import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function AddContact() {
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
        </div>
        <DialogFooter>
          <div className="flex flex-row w-full">
            <Button type="submit">Save Contact</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
