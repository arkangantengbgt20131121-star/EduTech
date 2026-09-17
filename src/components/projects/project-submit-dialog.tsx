"use client";

import * as React from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useProgress } from "@/components/progress/progress-provider";

export function ProjectSubmitDialog({
  projectTitle,
  xp,
}: {
  projectTitle: string;
  xp: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [link, setLink] = React.useState("");
  const { addXp } = useProgress();

  const submit = () => {
    addXp(Math.round(xp * 0.5), 20);
    toast.success("Project submitted! 🎉", {
      description: `+${Math.round(xp * 0.5)} XP for completing "${projectTitle}". Your teacher will review it soon.`,
    });
    setOpen(false);
    setNotes("");
    setLink("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="mt-4 w-full gap-2">
          <Upload className="size-4" /> Submit Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit “{projectTitle}”</DialogTitle>
          <DialogDescription>
            Add a link to your work (a Figma file, a photo, a video or a code playground), then tell
            your teacher what you are proud of.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="project-link">Link or file name</Label>
            <Input
              id="project-link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://www.figma.com/file/… or dice-photo.jpg"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-notes">What did you learn?</Label>
            <Textarea
              id="project-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="The trickiest part was calibrating the sensor, so I averaged five readings…"
            />
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
            Submissions are stored with your profile. In the full version they go to your teacher’s
            review queue and the community gallery.
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="gradient" onClick={submit} disabled={!notes.trim()}>
            Submit for review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
