"use client";

/*
::neup.documentation::emi-calculator

Interactive EMI calculator UI for the `/tools/emi-calculator` page.

::end
*/
import { useId, useState } from "react";
import { calculateEmiPaymentBreakdown } from "@/core/helpers/emi";

const currencyFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  maximumFractionDigits: 0,
  style: "currency",
});

const percentFormatter = new Intl.NumberFormat("en-NP", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-NP", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

const defaultValues = {
  downPayment: 2_500_000,
  interestRate: 10.5,
  price: 15_000_000,
  rateMode: "annual" as const,
  termYears: 20,
};

type RateMode = "annual" | "monthly";

type FieldProps = {
  id: string;
  label: string;
  onChange: (value: number) => void;
  step?: number;
  suffix?: string;
  value: number;
};

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.round(value));
}

function parseInputValue(value: string) {
  const parsed = Number(value.replace(/,/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({ id, label, onChange, step = 1, suffix, value }: FieldProps) {
  return (
    <label className="grid gap-3" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(event) => {
            onChange(parseInputValue(event.target.value));
          }}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-16 text-base text-slate-950 outline-none transition focus:border-brand focus:ring-4 focus:ring-sky-100"
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-slate-400">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function BreakdownBar({
  interest,
  principal,
}: {
  interest: number;
  principal: number;
}) {
  const total = Math.max(interest + principal, 1);
  const principalWidth = Number(((principal / total) * 100).toFixed(4));
  const interestWidth = Number((100 - principalWidth).toFixed(4));

  return (
    <div className="space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-[linear-gradient(135deg,#00B4EA,#38bdf8)]"
          style={{ width: `${principalWidth}%` }}
        />
        <div
          className="h-full bg-[linear-gradient(135deg,#f59e0b,#facc15)]"
          style={{ width: `${interestWidth}%` }}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700/75">
            Principal
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950">
            {formatCurrency(principal)}
          </p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700/75">
            Interest
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950">
            {formatCurrency(interest)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function EmiCalculator() {
  const priceId = useId();
  const downPaymentId = useId();
  const rateId = useId();
  const termId = useId();

  const [price, setPrice] = useState<number>(defaultValues.price);
  const [downPayment, setDownPayment] = useState<number>(defaultValues.downPayment);
  const [interestRate, setInterestRate] = useState<number>(defaultValues.interestRate);
  const [rateMode, setRateMode] = useState<RateMode>(defaultValues.rateMode);
  const [termYears, setTermYears] = useState<number>(defaultValues.termYears);

  const safePrice = Math.max(price, 0);
  const safeDownPayment = Math.min(Math.max(downPayment, 0), safePrice);
  const safeInterestRate = Math.max(interestRate, 0);
  const safeTermYears = Math.max(termYears, 1);
  const annualInterestRate =
    rateMode === "annual" ? safeInterestRate : safeInterestRate * 12;
  const breakdown = calculateEmiPaymentBreakdown({
    annualInterestRate,
    downPayment: safeDownPayment,
    loanTermYears: safeTermYears,
    propertyPrice: safePrice,
  });

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/70">
                EMI Calculator
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
                Loan inputs
              </h1>
            </div>
            <button
              type="button"
              onClick={() => {
                setPrice(defaultValues.price);
                setDownPayment(defaultValues.downPayment);
                setInterestRate(defaultValues.interestRate);
                setRateMode(defaultValues.rateMode);
                setTermYears(defaultValues.termYears);
              }}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          <div className="mt-8 grid gap-5">
            <Field
              id={priceId}
              label="Property price"
              value={safePrice}
              step={100000}
              onChange={setPrice}
            />

            <Field
              id={downPaymentId}
              label="Down payment"
              value={safeDownPayment}
              step={50000}
              onChange={setDownPayment}
            />

            <div className="grid gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="text-sm font-medium text-slate-700" htmlFor={rateId}>
                  Interest rate
                </label>
                <div className="inline-flex rounded-full bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setRateMode("annual");
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      rateMode === "annual"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRateMode("monthly");
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      rateMode === "monthly"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <Field
                id={rateId}
                label=""
                value={safeInterestRate}
                step={0.1}
                suffix="%"
                onChange={setInterestRate}
              />
            </div>

            <Field
              id={termId}
              label="Term"
              value={safeTermYears}
              step={1}
              suffix="yrs"
              onChange={setTermYears}
            />
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep/70">
              Loan summary
            </p>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-600">Loan amount</span>
                <span className="text-sm font-semibold text-slate-950">
                  {formatCurrency(breakdown.loanAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-600">Rate mode</span>
                <span className="text-sm font-semibold text-slate-950">
                  {rateMode === "annual"
                    ? `${percentFormatter.format(safeInterestRate)}% yearly`
                    : `${percentFormatter.format(safeInterestRate)}% monthly`}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-600">Term</span>
                <span className="text-sm font-semibold text-slate-950">
                  {numberFormatter.format(safeTermYears)} years
                </span>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-6">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/70">
              Monthly payment
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold leading-none text-slate-950 sm:text-5xl">
                  {formatCurrency(breakdown.monthlyEmi)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Estimated EMI per month.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Total
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {formatCurrency(breakdown.monthlyBreakdown.totalPayment)}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <BreakdownBar
                principal={breakdown.monthlyBreakdown.principal}
                interest={breakdown.monthlyBreakdown.interest}
              />
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/70">
              Yearly payment
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold leading-none text-slate-950 sm:text-5xl">
                  {formatCurrency(breakdown.yearlyBreakdown.totalPayment)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  First 12 months combined.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Year 1 EMI
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {formatCurrency(breakdown.monthlyEmi * Math.min(12, breakdown.numberOfPayments))}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <BreakdownBar
                principal={breakdown.yearlyBreakdown.principal}
                interest={breakdown.yearlyBreakdown.interest}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
