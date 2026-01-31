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

// Schema for validation
const schema = z.object({
  dailyRate: z.preprocess((v) => Number(v), z.number().min(0, "Required")),
  payFrequency: z.string().min(1, "Required"),
  workDays: z.preprocess((v) => Number(v), z.number().min(1, "Required")),
  maritalStatus: z.string().min(1, "Required"),
  pensionContribution: z.preprocess(
    (v) => Number(v),
    z.number().min(0, "Required"),
  ),
  businessExpenses: z.preprocess(
    (v) => Number(v),
    z.number().min(0, "Required"),
  ),
  currentSalary: z.preprocess((v) => Number(v), z.number().min(0, "Required")),
});

export function TaxCalculatorForm() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dailyRate: 0,
      workDays: 0,
      payFrequency: "",
      maritalStatus: "",
      pensionContribution: 0,
      businessExpenses: 0,
      currentSalary: 0,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);

    // Map form data to API payload
    const payload = {
      daily_rate: Number(data.dailyRate),
      days_worked: Number(data.workDays),
      payment_frequency: data.payFrequency,
      marital_status: data.maritalStatus,
      pension_contribution: Number(data.pensionContribution),
      expenses: Number(data.businessExpenses),
      current_annual_salary: Number(data.currentSalary),
    };

    console.log(payload);

    try {
      const response = await fetch(
        "https://mentis.myfenero.ie/api/tax-calculator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[901px] select-none"
      >
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
                      type="number"
                      placeholder="e.g. &euro; 450"
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
                How frequently will you get paid?*
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
                      <SelectItem value="biweekly">Biweekly</SelectItem>
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
                    type="number"
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
                What is your marital status?*
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
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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
                What is your pension contribution?*
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="number"
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
                How much business expenses will you claim?*
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="number"
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
                What is your current annual salary?*
              </FormLabel>

              <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]">
                <FormControl className="w-full">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                      &euro;
                    </span>
                    <Input
                      {...field}
                      type="number"
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
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            disabled={loading}
            className="z-10 min-w-[330px] w-full md:max-w-[250px] text-[20px] py-8 flex items-center gap-2 cursor-pointer  font-bold bg-[#D1DF20] hover:bg-[#C9D217] text-[#000E47] select-none mt-6"
          >
            {loading && <Spinner size={20} />}
            <IconCalculator className="!w-5 !h-5" stroke={3} />
            {loading ? "Submitting..." : "Calculate Now"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
