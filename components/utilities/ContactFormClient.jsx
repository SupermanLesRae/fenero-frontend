"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

import {
  IconUser,
  IconMail,
  IconPhone,
  IconInfoCircle,
  IconPencil,
} from "@tabler/icons-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone number is required"),
  enquiry: z.string().min(1, "Select an enquiry"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export function ContactFormClient({ selectOptions }) {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      enquiry: "",
      message: "",
      terms: false,
    },
  });

  const onSubmit = async (values) => {
    if (!captchaValue) {
      toast({
        title: "Verification required",
        description: "Please verify you are human.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setCaptchaValue(null);
        setLoading(false);
        toast.success(
          "Your message has been sent successfully. We’ll get back to you shortly."
        );

        form.reset();
      } else {
        toast.error("Failed to send message. Please try again later.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* 2 COLUMN GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 border-b border-gray-300">
                  <IconUser className="text-gray-400" size={20} />
                  <FormControl className="flex-1">
                    <Input
                      placeholder="Name"
                      {...field}
                      className="border-0 rounded-none px-0 focus-visible:ring-0"
                    />
                  </FormControl>
                </div>
                <div className="h-5">
                  <FormMessage className="text-red-500 text-sm" />
                </div>
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 border-b border-gray-300">
                  <IconMail className="text-gray-400" size={20} />
                  <FormControl className="flex-1">
                    <Input
                      placeholder="Email"
                      {...field}
                      className="border-0 rounded-none px-0 focus-visible:ring-0"
                    />
                  </FormControl>
                </div>
                <div className="h-5">
                  <FormMessage className="text-red-500 text-sm" />
                </div>
              </FormItem>
            )}
          />

          {/* PHONE */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 border-b border-gray-300">
                  <IconPhone className="text-gray-400" size={20} />
                  <FormControl className="flex-1">
                    <Input
                      placeholder="Phone"
                      {...field}
                      className="border-0 rounded-none px-0 focus-visible:ring-0"
                    />
                  </FormControl>
                </div>
                <div className="h-5">
                  <FormMessage className="text-red-500 text-sm" />
                </div>
              </FormItem>
            )}
          />

          {/* ENQUIRY */}
          <FormField
            control={form.control}
            name="enquiry"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 border-b border-gray-300">
                  <IconInfoCircle className="text-gray-400" size={20} />
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="flex-1">
                      <SelectTrigger className="w-full border-0 rounded-none px-0 bg-transparent focus:ring-0">
                        <SelectValue placeholder="General Enquiries" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="border-0 shadow-none">
                      {selectOptions.map((item, index) => (
                        <SelectItem value={item.selection} key={index}>
                          {item.selection}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-5">
                  <FormMessage className="text-red-500 text-sm" />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* MESSAGE */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-2 border-b-2 border-gray-100 focus-within:border-gray-100">
                <IconPencil className="text-gray-400 mt-1" size={20} />
                <FormControl className="flex-1">
                  <Textarea
                    placeholder="How can we help you?"
                    rows={3}
                    {...field}
                    className="border-0 rounded-none px-0 resize-none focus-visible:ring-0 min-h-30"
                  />
                </FormControl>
              </div>
              <div className="h-5">
                <FormMessage className="text-red-500 text-sm" />
              </div>
            </FormItem>
          )}
        />

        {/* TERMS + CAPTCHA + SUBMIT */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(!!v)}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    I agree that my data will be collected and stored
                  </FormLabel>
                </div>
                <div className="h-5">
                  <FormMessage className="text-red-500 text-sm" />
                </div>
              </FormItem>
            )}
          />

          {/* reCAPTCHA */}
          <FormItem>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
            />
          </FormItem>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="z-10 flex items-center gap-2 cursor-pointer flex-1 h-10 max-w-[250px] bg-[#D1DF20] hover:bg-[#C9D217] text-[#000E47] select-none"
          >
            {loading && <Spinner size={20} />}
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
