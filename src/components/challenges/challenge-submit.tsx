"use client";

import * as React from "react";
import { Send } from "lucide-react";
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

export function ChallengeSubmit({
  challengeTitle,
  xp,
}: {
  challengeTitle: string;
  xp: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState("");
  const [reflection, setReflection] = React.useState("");
  const [errors, setErrors] = React.useState<string | null>(null);
  const { addXp } = useProgress();

  const submit = () => {
    if (!link.trim()) {
      setErrors("Add a link to your work so a mentor can review it.");
      return;
    }
    if (reflection.trim().length < 20) {
      setErrors("Write at least a sentence about how you solved the hardest part.");
      return;
    }
    setErrors(null);
    addXp(xp, 45);
    toast.success("Challenge submitted! 🏆", {
      description: `+${xp} XP · "${challengeTitle}" is queued for review.`,
    });
    setOpen(false);
    setLink("");
    setReflection("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="mt-4 w-full gap-2">
          <Send className="size-4" /> Submit Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit your entry</DialogTitle>
          <DialogDescription>
            {challengeTitle} · reviews usually take one or two school days.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="challenge-link">Link to your work</Label>
            <Input
              id="challenge-link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="Photo, video, Figma file or playground link"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="challenge-reflection">Reflection</Label>
            <Textarea
              id="challenge-reflection"
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
              placeholder="What was the hardest part, and how did you get past it?"
            />
          </div>

          <div className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Checklist before you submit</p>
            <ul className="mt-1.5 space-y-1">
              <li>✓ Every requirement is covered</li>
              <li>✓ Your work is visible to anyone with the link</li>
              <li>✓ You tested it at least twice</li>
            </ul>
          </div>

          {errors ? (
            <p className="rounded-xl bg-destructive/10 p-2.5 text-xs font-semibold text-destructive">
              {errors}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="gradient" onClick={submit}>
            Submit entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
