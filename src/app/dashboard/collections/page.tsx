"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../components/custom-ui/DataTable";
import { columns } from "../../components/collections/CollectionsColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from '@/components/ui/separator'
import { useRouter } from "next/navigation";

type Props = {};

const Collections = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="px-10 py-5">
    <div className="flex items-center justify-between">
      <p className="text-[30px] leading-[21px] font-[500]">Collections</p>
      <Button className="bg-blue-400 text-white hover:bg-[#303030]" onClick={() => router.push('collections/new')}>
        <Plus className="h-4 w-4 mr-2"/>
        Create Collection
      </Button>
    </div>
    <Separator className="my-4 bg-gray-400"/>
      <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  );
};

export default Collections;
