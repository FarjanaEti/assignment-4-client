"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { beProviderAction } from "@/app/action/beProvider.action";

export default function PartnerWithUsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const res = await beProviderAction(formData);

    setLoading(false);
    setMessage(res.message);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Partner with FoodHub</CardTitle>
          <CardDescription>
            Become a verified provider and reach more customers.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {message && (
            <p className="mb-4 text-green-600">{message}</p>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div>
              <Label>Business Name</Label>
              <Input name="businessName" required />
            </div>

            <div>
              <Label>Contact Number</Label>
              <Input name="contactNumber" required />
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" required />
            </div>

            {/* FIXED WIDTH */}
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                rows={5}
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {loading ? "Submitting..." : "Apply as Provider"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}