import { Suspense } from "react";
import { SpinnerCustom } from "@/components/ui/Spinner";
import OrdersPageContent from "./OrdersPageContent";

export default function OrdersPage() {
  return (
    <Suspense fallback={<SpinnerCustom />}>
      <OrdersPageContent />
    </Suspense>
  );
}
