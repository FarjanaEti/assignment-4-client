import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetProvidersParams {
  search?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const providerService = {
  getAllProviders: async function (
    params?: GetProvidersParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/provider`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      // Optional tagging (for revalidation)
      config.next = { ...config.next, tags: ["providers"] };

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        ...config,
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch providers");
      }

      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong" },
      };
    }
  },
};
