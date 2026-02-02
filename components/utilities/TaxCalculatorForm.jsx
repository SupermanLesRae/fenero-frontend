"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { IconCalculator } from "@tabler/icons-react";
import { Spinner } from "../ui/spinner";
import { IconChartBar } from "@tabler/icons-react";
import { useEffect } from "react";

const REQUIRED = "* Required";

// Accepts: 123, 123.4, 123.45
const moneyRegex = /^\d+(\.\d{1,2})?$/;

const numberRequired = z
  .string()
  .trim()
  .refine((v) => v.length > 0, { message: REQUIRED }) // empty check
  .refine((v) => moneyRegex.test(v), {
    message: "Invalid number format (max 2 decimals)",
  })
  .transform((v) => Number(v));

const schema = z.object({
  dailyRate: z.preprocess((val) => Number(val), z.number().min(0, REQUIRED)),

  workDays: z.number().min(1, REQUIRED),

  pensionContribution: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().min(0).optional(),
  ),

  businessExpenses: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().min(0).optional(),
  ),

  currentSalary: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().min(0).optional(),
  ),

  payFrequency: z.string().min(1, REQUIRED),

  maritalStatus: z.string().min(1, REQUIRED),
});

export function TaxCalculatorForm() {
  const [results, setResults] = useState({
    grossIncome: ["1.00", "4.00", "7.00"],
    feneroFee: ["2.00", "5.00", "8.00"],
    netPay: ["3.00", "6.00", "9.00"],
  });
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dailyRate: 450,
      workDays: 20,
      payFrequency: "monthly",
      maritalStatus: "single",
      pensionContribution: "",
      businessExpenses: "",
      currentSalary: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    //setResults(null);

    // Map form data to API payload
    const payload = {
      daily_rate: Number(data.dailyRate),
      days_worked: Number(data.workDays),
      payment_frequency: data.payFrequency,
      marital_status: data.maritalStatus,
      pension_contribution: Number(data.pensionContribution || 0),
      expenses: Number(data.businessExpenses),
      current_annual_salary: Number(data.currentSalary || 0),
    };

    console.log(payload);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_TAX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const resultData = await response.json();
      console.log("API result:", resultData);
      setResult(resultData); // adjust if the API returns a specific property
    } catch (error) {
      console.error(error);
      alert("Failed to calculate tax.");
    } finally {
      setLoading(false);
    }
  };

  const payFrequency = form.watch("payFrequency");

  useEffect(() => {
    if (payFrequency === "monthly") {
      form.setValue("workDays", 20);
      form.setValue("businessExpenses", 300);
    } else if (payFrequency === "weekly") {
      form.setValue("workDays", 5);
      form.setValue("businessExpenses", 75);
    }
  }, [payFrequency, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[901px] "
      >
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="flex-1 text-left">
            <p className="text-2xl font-extrabold text-[#000E47] flex items-center gap-3 flex-row">
              <IconCalculator className="!w-4 !h-4" stroke={3} />
              Enter your details
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
            <p className="text-xs font-bold">
              <i>Fields marked with an asterisk * are mandatory</i>
            </p>
          </div>
        </div>

        {/** 1. Daily Rate */}
        <FormField
          control={form.control}
          name="dailyRate"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              {/* Label takes remaining space */}
              <FormLabel className="flex-1 text-left">
                What is your contract daily rate? *
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                {/* Input with euro prefix */}
                <FormControl className="w-full">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="text" // 🔥 Important change!
                      inputMode="decimal"
                      placeholder="450"
                      min={0}
                      className="h-[60px] w-full rounded-xl border border-[#036735] pl-8 pr-3"
                    />
                  </div>
                </FormControl>

                {/* Error message */}
                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payFrequency"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              {/* Label */}
              <FormLabel className="flex-1 text-left">
                How frequently will you get paid? *
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <Select
                    value={field.value || ""} // controlled value
                    onValueChange={field.onChange} // update react-hook-form
                  >
                    <SelectTrigger className="w-full h-[60px] bg-white text-black border border-[#036735] rounded-xl flex items-center justify-between px-3 text-sm leading-none">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Error message */}
                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/** 3. Work Days */}
        <FormField
          control={form.control}
          name="workDays"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              {/* Label takes remaining space */}
              <FormLabel className="flex-1 text-left">
                How many days do you intend to work? *
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                {/* Input with number */}
                <FormControl className="w-full">
                  <Input
                    {...field}
                    type="text" // 🔥 Important change!
                    inputMode="decimal"
                    min={1}
                    placeholder="0"
                    className="h-[60px] w-full rounded-xl border border-[#036735] pl-3 pr-3"
                  />
                </FormControl>

                {/* Error message */}
                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              {/* Label takes remaining space */}
              <FormLabel className="flex-1 text-left">
                What is your marital status? *
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <Select
                    value={field.value || ""} // controlled value
                    onValueChange={field.onChange} // update react-hook-form
                  >
                    <SelectTrigger className="w-full h-[60px] bg-white text-black border border-[#036735] rounded-xl flex items-center justify-between px-3 text-sm leading-none">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="single">
                        Single, separated or divorced
                      </SelectItem>

                      <SelectItem value="married_one_earner">
                        Married (one spouse earning)
                      </SelectItem>

                      <SelectItem value="married_two_earners">
                        Married (both spouses earning)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Error message */}
                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/** 5. Pension Contribution */}
        <FormField
          control={form.control}
          name="pensionContribution"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              {/* Label takes remaining space */}
              <FormLabel className="flex-1 text-left">
                What is your pension contribution?
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="text" // 🔥 Important change!
                      inputMode="decimal"
                      min={0}
                      placeholder="0.00"
                      className="h-[60px] w-full rounded-xl border border-[#036735] pl-8 pr-3"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/** 6. Business Expenses */}
        <FormField
          control={form.control}
          name="businessExpenses"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              <FormLabel className="flex-1 text-left">
                How much business expenses will you claim?
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="text" // 🔥 Important change!
                      inputMode="decimal"
                      min={0}
                      placeholder="0.00"
                      className="h-[60px] w-full rounded-xl border border-[#036735] pl-8 pr-3"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/** 7. Current Annual Salary */}
        <FormField
          control={form.control}
          name="currentSalary"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row items-center gap-4">
              <FormLabel className="flex-1 text-left">
                What is your current annual salary?
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="text" // 🔥 Important change!
                      inputMode="decimal"
                      min={0}
                      placeholder="0.00"
                      className="h-[60px] w-full rounded-xl border border-[#036735] pl-8 pr-3"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-sm mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-4 ">
          <Button
            type="submit"
            disabled={loading}
            className="z-10 md:min-w-[330px] w-full md:max-w-[250px] text-[20px] py-8 flex items-center gap-2 cursor-pointer  font-bold bg-[#D1DF20] hover:bg-[#C9D217] text-[#000E47] select-none mt-6"
          >
            {loading && <Spinner size={20} />}
            <IconCalculator className="!w-5 !h-5" stroke={3} />
            {loading ? "Submitting..." : "Calculate Now"}
          </Button>
        </div>
      </form>

      <div className="mt-10">
        <div className="mb-4 text-2xl font-extrabold text-[#000E47] flex items-center gap-3">
          <IconChartBar className="!w-4 !h-4" stroke={3} />
          Your Results
        </div>

        <div className="bg-white rounded-lg border border-[#38BB3F] shadow-md p-4 space-y-4 md:p-0 md:space-y-0 md:overflow-x-auto">
          {/* Mobile stacked cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {[
              {
                title: "Gross Monthly/Weekly Income",
                values: results.grossIncome,
              },
              {
                title: `
      Fenero Fee <br/>
      <div class="text-xs">(All inclusive & tax deductible)</div>
    `,
                values: results.feneroFee,
              },
              {
                title: `
      Monthly Net Pay <br/>
      <div class="text-xs">(including pension contribution)*</div>
    `,
                values: results.netPay,
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="border-t border-[#CEEED6] rounded-lg p-3 bg-gray-50 flex flex-col gap-2"
              >
                {/* Row title */}
                <div
                  dangerouslySetInnerHTML={{ __html: row.title }}
                  className="font-bold text-md text-gray-700"
                ></div>

                {/* Stacked values */}
                <div className="flex flex-col gap-1 text-sm text-gray-900">
                  <span>
                    <b>Umbrella PAYE:</b> &euro;{row.values[0]}
                  </span>
                  <span>
                    <b>Umbrella Director / PSC:</b> &euro;{row.values[1]}
                  </span>
                  <span>
                    <b>Current Salary:</b> &euro;{row.values[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="min-w-full text-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left"></th>
                  <th className="px-4 py-4 text-left">Umbrella PAYE</th>
                  <th className="px-4 py-4 text-left">
                    Umbrella Director / PSC
                  </th>
                  <th className="px-4 py-4 text-left">Current Salary</th>
                </tr>
              </thead>

              <tbody>
                {/* Gross */}
                <tr className="border-t border-[#CEEED6] text-center">
                  <td className="px-4 py-4 text-left">
                    Gross Monthly/Weekly Income
                  </td>

                  {results.grossIncome.map((value, i) => (
                    <td key={i} className="px-4 py-4 text-sm">
                      &euro;{value}
                    </td>
                  ))}
                </tr>

                {/* Fenero Fee */}
                <tr className="border-t border-[#CEEED6] text-center">
                  <td className="px-4 py-4 text-left">
                    Fenero Fee
                    <br />
                    <div className="text-xs">
                      (All inclusive & tax deductible)
                    </div>
                  </td>

                  {results.feneroFee.map((value, i) => (
                    <td key={i} className="px-4 py-4 text-sm">
                      &euro;{value}
                    </td>
                  ))}
                </tr>

                {/* Net Pay */}
                <tr className="border-t border-[#CEEED6] text-center">
                  <td className="px-4 py-4 font-bold text-left text-lg leading-0.5 pt-7">
                    Monthly Net Pay
                    <br />
                    <div className="text-sm mt-2">
                      (including pension contribution)*
                    </div>
                  </td>

                  {results.netPay.map((value, i) => (
                    <td key={i} className="px-4 py-4 font-bold text-lg">
                      &euro;{value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Form>
  );
}
