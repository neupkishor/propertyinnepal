import type { Metadata } from "next";
import { EmiCalculator } from "@/components/emi-calculator";

/*
::neup.documentation::emi-calculator-page

Landing page for the EMI calculator tool.

::end
*/
export const metadata: Metadata = {
  title: "EMI Calculator",
  description:
    "Estimate monthly mortgage repayments, total interest, and total repayment in NPR.",
};

export default function EmiCalculatorPage() {
  return (
    <>
      <section className="px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <EmiCalculator />
      </section>
    </>
  );
}
