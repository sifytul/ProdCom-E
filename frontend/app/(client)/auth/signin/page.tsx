import { Suspense } from "react";
import { SpinnerCustom } from "@/components/ui/Spinner";
import SignInPageContent from "./SignInPageContent";

export default function SignInPage() {
  return (
    <Suspense fallback={<SpinnerCustom />}>
      <SignInPageContent />
    </Suspense>
  );
}
