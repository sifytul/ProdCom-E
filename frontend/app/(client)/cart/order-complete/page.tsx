import { Suspense } from "react";
import { SpinnerCustom } from "@/components/ui/Spinner";
import OrderCompletePageContent from "./OrderCompletePageContent";

export default function OrderCompletePage() {
  return (
    <Suspense fallback={<SpinnerCustom />}>
      <OrderCompletePageContent />
    </Suspense>
  );
}
