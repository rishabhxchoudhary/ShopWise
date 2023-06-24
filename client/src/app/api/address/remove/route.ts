import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { removeAddress } from "@/controller/userController";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { addressId } = body;
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    await removeAddress(email, addressId);
    return NextResponse.json({ data: [] });
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
