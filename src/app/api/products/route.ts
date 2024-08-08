import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/src/app/lib/mongoDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Product from "../../lib/models/Product";

export const POST = async (req: NextRequest) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("Attempting to connect to MongoDB...");
    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    await newProduct.save();
    return NextResponse.json(newProduct, {status: 200})
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};
