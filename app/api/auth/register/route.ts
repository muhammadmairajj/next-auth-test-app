import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    console.log({ name, email, password });

    const hashedPassword = await hash(password, 10);
    const response = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
    console.log("response", response);
  } catch (err) {console.log(err);}

  return NextResponse.json({ message: 'success' }, { status: 200 });
}
