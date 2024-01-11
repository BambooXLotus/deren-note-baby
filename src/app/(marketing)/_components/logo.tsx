import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo: React.FC = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        className="dark:hidden"
        src="/logo.svg"
        height="40"
        width="40"
        alt="logo"
      />
      <Image
        className="hidden dark:block"
        src="/logo-dark.svg"
        height="40"
        width="40"
        alt="logo"
      />
      <p className={cn("font-semibold", font.className)}>NoteBaby</p>
    </div>
  );
};
