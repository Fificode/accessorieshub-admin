import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToDB } from "@/src/app/lib/mongoDB";
import Collection from "@/src/app/lib/models/Collection";

export const DELETE = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
    try{
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        // console.log("User id:", user?.id);
        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
          await connectToDB();
          console.log(params.collectionId);
    await Collection.findByIdAndDelete(params.collectionId)
    return new NextResponse("Collection is deleted", {status: 200})
    }
    catch(err){
console.log('[collectionId_DELETE',err);
return new NextResponse("Internal error", {status: 500})
    }
}