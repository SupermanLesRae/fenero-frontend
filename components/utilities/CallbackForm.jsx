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

export default function CallbackForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      telephone: "",
    },
    mode: "onTouched", // validate on blur
  });

  const onSubmit = async (values) => {
    setLoading(true);

    const res = await fetch("/api/requestcallback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        surname: values.surname,
        email: values.email,
        telephone: values.telephone,
      }),
    });

    if (res.ok) {
      setLoading(false);
      toast.success(
        "Your callback request has been sent. We'll get back to you shortly."
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-[650px] mx-auto"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  className="bg-white rounded-xl border border-gray-300 h-13.75"
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
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Surname"
                  className="bg-white rounded-xl border border-gray-300 h-13.75"
                />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />

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
            <FormItem>
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
            <FormItem>
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

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-2">
          <Button
            type="submit"
            disabled={loading}
            className={`z-10 cursor-pointer flex-1 max-w-[250px] h-[48px] select-none ${
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
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
