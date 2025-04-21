import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Please add SIGNING_SECRET from Clerk Dashboard to .env");
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Verification failed", { status: 400 });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const {
          id: clerkId,
          email_addresses,
          username,
          first_name,
          last_name,
          image_url,
        } = evt.data;
        const primaryEmail = email_addresses[0]?.email_address;

        await prisma.user.create({
          data: {
            id: randomUUID(),
            clerkId: clerkId,
            email: primaryEmail,
            username: username || `user_${clerkId.slice(0, 8)}`,
            displayName: first_name
              ? `${first_name}${last_name ? ` ${last_name}` : ""}`
              : `User ${clerkId.slice(0, 8)}`,
            profileImageUrl: image_url,
          },
        });
        break;
      }

      case "user.updated": {
        const {
          id,
          email_addresses,
          username,
          first_name,
          last_name,
          image_url,
        } = evt.data;
        const primaryEmail = email_addresses[0]?.email_address;

        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: primaryEmail ?? undefined,
            username: username ?? undefined,
            displayName: first_name
              ? `${first_name}${last_name ? ` ${last_name}` : ""}`
              : undefined,
            profileImageUrl: image_url ?? undefined,
            updatedAt: new Date(),
          },
        });
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        if (!id) {
          throw new Error("User ID is required for deletion");
        }
        await prisma.user.delete({
          where: { clerkId: id },
        });
        break;
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error processing webhook:", errorMessage);
    return new Response(
      JSON.stringify({
        error: "Error processing webhook",
        details: errorMessage,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export const config = {
  runtime: "edge",
};
