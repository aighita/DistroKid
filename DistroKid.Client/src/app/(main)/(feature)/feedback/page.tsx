"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackApi } from "@/infrastructure/apis/client";
import { UserRoleEnum } from "@/infrastructure/apis/client/models";
import { useAuth } from "@/contexts/AuthContext";
import { getApiConfig, runApiRequest } from "@/lib/api";

export default function FeedbackPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const [formData, setFormData] = React.useState({
    type: "Suggestion",
    rating: "5",
    isAnonymous: false,
    comment: "",
  });

  React.useEffect(() => {
    if (!isAuthLoading && user?.role === UserRoleEnum.Admin) {
      router.replace("/admin/feedback");
    }
  }, [isAuthLoading, router, user?.role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user?.role === UserRoleEnum.Admin) {
      setError("Admins cannot submit feedback.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const api = new FeedbackApi(getApiConfig());
      await runApiRequest(
        () => api.apiFeedbackAddPost({
          feedbackAddRecord: {
            type: formData.type,
            rating: parseInt(formData.rating, 10),
            isAnonymous: formData.isAnonymous,
            comment: formData.comment,
          },
        }),
        "Failed to submit feedback",
      );
      setSuccess(true);
      setTimeout(() => router.push("/releases"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading || user?.role === UserRoleEnum.Admin) {
    return null;
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been submitted successfully. Redirecting you back...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg shadow-lg border-2 border-border/50">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Feedback</CardTitle>
            <CardDescription>
              We value your input. Let us know how we can improve DistroKid.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="type">Feedback Type</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => setFormData((prev) => ({ ...prev, type: v }))}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Suggestion">Suggestion</SelectItem>
                  <SelectItem value="Bug">Bug Report</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Rating</Label>
              <RadioGroup
                value={formData.rating}
                onValueChange={(v) => setFormData((prev) => ({ ...prev, rating: v }))}
                className="flex gap-4"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <div key={r} className="flex items-center space-x-2">
                    <RadioGroupItem value={String(r)} id={`r${r}`} />
                    <Label htmlFor={`r${r}`} className="font-normal cursor-pointer">
                      {r}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isAnonymous: !!checked }))
                }
              />
              <Label
                htmlFor="anonymous"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Submit anonymously
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Message</Label>
              <Textarea
                id="comment"
                placeholder="Tell us what's on your mind..."
                className="min-h-[120px] resize-none"
                required
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 bg-muted/30">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#5227FF] hover:bg-[#401ED9]">
              {isLoading ? "Submitting..." : "Send Feedback"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
