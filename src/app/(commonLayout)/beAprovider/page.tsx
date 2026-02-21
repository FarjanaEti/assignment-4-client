"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PartnerWithUsPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const payload = {
    restaurantName: formData.get("businessName"),
    address: formData.get("location"),
    phone: formData.get("contactNumber"),
    description: formData.get("description"),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/provider`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const data = await res.json();
    alert(data.message || "Failed to become provider");
    return;
  }

  alert("You are now a provider!");
      callbackURL: "http://localhost:3000"

 
};

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Partner with FoodHub</CardTitle>
          <CardDescription>
            Become a verified provider and reach more customers through our
            platform.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business / Kitchen Name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="e.g. Mama's Kitchen"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+880..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="City, Area"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Tell us about your food service
              </Label>
              <textarea id="description"
                name="description"
                placeholder="Cuisine type, experience, specialties..."
                rows={4}
                required></textarea>
                
             
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Apply as a Provider"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}