"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
}

export function AddToCartButton({ 
  className, 
  size = "sm", 
  showIcon = true 
}: AddToCartButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={size}
      disabled={pending}
      className={cn("rounded-xl font-bold gap-2", className)}
    >
      {pending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        showIcon && <ShoppingCart size={16} />
      )}
      {pending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
