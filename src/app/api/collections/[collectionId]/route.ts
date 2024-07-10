import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToDB } from "@/src/app/lib/mongoDB";
import Collection from "@/src/app/lib/models/Collection";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB()
    const collection = await Collection.findById(params.collectionId);

    if(!collection){
        return new NextResponse(JSON.stringify({message: "Collection not found"}), {status: 404})

    }
return NextResponse.json(collection, {status: 200})

  } catch (err) {
    console.log("[collectionId_GET", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async(req: NextRequest, { params }: { params: { collectionId: string } }) => {
try{
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("Attempting to connect to MongoDB...");
    await connectToDB();

    let collection = await Collection.findById(params.collectionId)

    if(!collection){
        return new NextResponse("Collection not found", {status: 404})
    }

    const {title, description, image} = await req.json()

    if(!title || !image){
        return new NextResponse("Title and Image are required", {status: 400})
    }

    collection = await Collection.findByIdAndUpdate(params.collectionId, {title, description, image}, {new: true})

    await collection.save()

    return NextResponse.json(collection, {status: 200})
}
catch(err){
    console.log("[collectionId_POST", err);
    return new NextResponse("Internal error", { status: 500 });
}
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    console.log(params.collectionId);
    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
