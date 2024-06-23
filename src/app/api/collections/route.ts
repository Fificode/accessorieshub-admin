import { connectToDB } from "@/src/app/lib/mongoDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Collection from "@/src/app/lib/models/Collection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log('User id:', user?.id);

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    console.log("Attempting to connect to MongoDB...");
    await connectToDB();

    const { title, description, image } = await req.json();
    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      console.log("Collection already exists");
      return new NextResponse("Collection already exists", { status: 400 });
    }
    if (!title || !image) {
      console.log("Validation error: Title and image are required");
      return new NextResponse("Title  and image are required", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
