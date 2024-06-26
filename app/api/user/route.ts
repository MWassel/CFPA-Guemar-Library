import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function GET() {
  const user = await prisma.user.deleteMany();
  return NextResponse.json(user);
}
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const userId = data.get("userId") as string;
  const fullname = data.get("fullname") as string;
  const username = data.get("username") as string;
  const password = data.get("password") as string;
  const email = data.get("email") as string;
  const sex = data.get("sex") as string;
  const specialization = data.get("specialization") as string;

  const File: File = data.get("profile_pic") as File;
  const bytes = await File.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(
    process.cwd(),
    "public/uploads/profile_pictures",
    File.name
  );
  await writeFile(path, buffer);

  const imageUrl = `uploads/profile_pictures/${File.name}`;

  const user = await prisma.user.create({
    data: {
      user_id: userId,
      fullname: fullname,
      username: username,
      password_key: password,
      email: email,
      sex: sex,
      specialization: specialization,
      profile_picture: imageUrl,
    },
  });
  if (user) {
    // Successful login
    return NextResponse.json({ success: true });
  } else {
    // Invalid credentials
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
