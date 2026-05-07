import { Suspense } from "react";
import { SpinnerCustom } from "@/components/ui/Spinner";
import SignUpPageContent from "./SignUpPage";

export default function SignUpPage() {
  return (
    <Suspense fallback={<SpinnerCustom />}>
      <SignUpPageContent />
    </Suspense>
  );
}
