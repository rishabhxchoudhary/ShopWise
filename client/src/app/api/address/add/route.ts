import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { addNewAddress } from "@/controller/userController";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { newAddress } = body;
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    await addNewAddress(email, newAddress);
    return NextResponse.json({ data: [] });
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
