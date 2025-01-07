import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const userDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchDetails: Record<string, unknown>;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  searchDetails,
}: UserDetailsModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const validatedData = userDetailsSchema.parse(formData);

      const response = await fetch("/api/submit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validatedData,
          service: "Vehicle Search",
          additionalDetails: searchDetails,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Search Submitted",
          description: "Your search request has been submitted successfully.",
        });
        onClose();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors);
      } else {
        console.error("Error sending request:", error);
        toast({
          title: "Error",
          description:
            "There was a problem submitting your search. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Details</DialogTitle>
          <DialogDescription>
            Please provide your contact information to complete your search.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full"
                />
                {errors.find((e) => e.path[0] === "name") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.find((e) => e.path[0] === "name")?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobile" className="text-right">
                Mobile
              </Label>
              <div className="col-span-3">
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full"
                />
                {errors.find((e) => e.path[0] === "mobile") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.find((e) => e.path[0] === "mobile")?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full"
                />
                {errors.find((e) => e.path[0] === "email") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.find((e) => e.path[0] === "email")?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
