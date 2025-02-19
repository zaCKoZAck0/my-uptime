import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { prisma } from "~/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();

  const teams = await prisma.team.findMany({
    where: {
      userId: session!.user.id,
    },
  });

  // If there's already a team, redirect to monitors
  if (teams.length > 0)
    return NextResponse.redirect(
      new URL(`teams/${teams[0].id}/monitors`, request.url)
    );

  return NextResponse.redirect(new URL("/onboarding/teams", request.url));
}
