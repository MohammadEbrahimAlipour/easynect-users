import React from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  // The key of this object ([pageView]) should match the filename
  const { pageView } = router.query;

  return <div>My Page View: {pageView}</div>;
}
