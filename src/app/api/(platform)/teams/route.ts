import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import { CreateTeam, TRequestBody } from "./request-schema";
import { GlobalResponse } from "~/lib/global-response";
import { auth } from "~/auth";
import { ErrorResponse, validateRequest } from "~/lib/api-advice";

export async function GET() {
  try {
    const session = await auth();
    const teams = await prisma.team.findMany({
      where: {
        id: session!.user.id,
      },
    });
    return NextResponse.json(GlobalResponse(teams), { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const session = await auth();
    const data = validateRequest<TRequestBody>(body, CreateTeam);
    const team = await prisma.team.create({
      data: {
        name: data.name,
        owner: {
          connect: {
            id: session!.user.id,
          },
        },
      },
    });
    return NextResponse.json(GlobalResponse(team), { status: 201 });
  } catch (error) {
    return ErrorResponse(error);
  }
}
