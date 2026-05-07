import { Suspense } from "react";
import PaymentPageContent from "./PaymentPageContent";
import { SpinnerCustom } from "@/components/ui/Spinner";

export default function PaymentPage() {
  return (
    <Suspense fallback={<SpinnerCustom />}>
      <PaymentPageContent />
    </Suspense>
  );
}
