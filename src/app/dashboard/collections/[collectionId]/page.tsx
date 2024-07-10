'use client'
import { useEffect, useState } from "react";
import Loader from "@/src/app/components/custom-ui/Loader";
import CollectionForm from "@/src/app/components/collections/CollectionForm";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[collections_GET] Server error: ${errorText}`);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("Collectionid_GET", err);
    }
  };
  useEffect(() => {
    getCollectionDetails()
  }, []);
  return loading ? <Loader/> : (
  <CollectionForm initialData={collectionDetails}/>);
};

export default CollectionDetails;
