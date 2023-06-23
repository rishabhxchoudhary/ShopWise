import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getaddress } from "@/controller/userController";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const data = await getaddress(email);
    return NextResponse.json({ data: data });
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
