import { NextResponse } from "next/server";
import { users } from "@/db/schema/users";
import { signupSchema } from "@/app/lib/validations/auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = signupSchema.safeParse(body);
    
    if (!result.success) {
      const flattened = z.flattenError(result.error);
    
      return NextResponse.json({
        message: "All Fields are Required.",
        errors: flattened,
      },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    if (password.length < 6) {
      return NextResponse.json({
        message: "Password too short."
      }, {
        status: 400
      });
    }
    
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  
    if (existingUser.length > 0) {
      return NextResponse.json({
        message: "User Exists."
      }, {
        status: 409
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
    
    return NextResponse.json(
      { message: "User Created Successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    
    return NextResponse.json(
      { message: "Something Went Down." },
      { status: 500 }
    );
  }
}
