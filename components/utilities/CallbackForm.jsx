"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

export default function CallbackForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      telephone: "",
      message: "",
    },
    mode: "onTouched", // validate on blur
  });

  const onSubmit = async (values) => {
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${baseUrl}/api/requestcallback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        surname: values.surname,
        email: values.email,
        telephone: values.telephone,
        message: values.message,
      }),
    });

    if (res.ok) {
      setLoading(false);
      toast.success(
        "Your callback request has been sent. We'll get back to you shortly.",
      );
      form.reset();
    } else {
      toast.error("Failed to send message. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-0 w-full lg:max-w-162.5 mx-auto"
      >
        <div className="block space-y-4 md:space-y-0 md:flex  gap-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name"
                    className="w-full bg-white rounded-xl border border-gray-300 h-13.75"
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />

          {/* Surname */}
          <FormField
            control={form.control}
            name="surname"
            rules={{ required: "Surname is required" }}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Surname"
                    className="w-full bg-white rounded-xl border border-gray-300 h-13.75"
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
        </div>

        <div className="block space-y-4 md:space-y-0 md:flex  gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Email"
                    className="bg-white rounded-xl border border-gray-300 h-13.75"
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />

          {/* Telephone */}
          <FormField
            control={form.control}
            name="telephone"
            rules={{
              required: "Telephone is required",
              pattern: {
                value: /^[0-9+\-()\s]{6,20}$/,
                message: "Enter a valid phone number",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    placeholder="Telephone"
                    className="bg-white rounded-xl border border-gray-300 h-13.75"
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          rules={{
            required: "Message is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Your message"
                  className="bg-white rounded-xl border border-gray-300 h-32.25 px-6 py-4"
                />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-2">
          <Button
            type="submit"
            disabled={loading}
            className={`z-10 cursor-pointer flex-1 md:max-w-62.5 h-12 select-none ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#D1DF20] hover:bg-[#C9D217] text-[#000E47]"
            }`}
          >
            {loading && (
              <span className="mr-2">
                <Spinner size={20} />
              </span>
            )}
            {loading ? "Submitting..." : "Request A Callback"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
