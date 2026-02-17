// At top of page or in separate actions file
"use server";

import { providerService } from "@/services/provider.service";


export async function deleteProviderAction(formData: FormData) {
  const providerId = formData.get("providerId") as string;

  if (!providerId) throw new Error("Provider ID missing");

  await providerService.deleteProvider(providerId);


}
