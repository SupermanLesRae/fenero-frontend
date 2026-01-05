import { Spinner } from "@/components/ui/spinner";

export default function loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#000E47]">
      <Spinner className="size-16 -mt-40 text-[#AFCE67]" />
    </div>
  );
}
