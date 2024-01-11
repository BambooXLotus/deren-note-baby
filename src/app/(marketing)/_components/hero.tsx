import Image from "next/image";

type HeroProps = {
  id?: string;
};

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            className="object-contain dark:hidden"
            src="/documents.png"
            fill
            alt="documents"
          />
          <Image
            className="hidden object-contain dark:block"
            src="/documents-dark.png"
            fill
            alt="documents"
          />
        </div>
        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            className="object-contain dark:hidden"
            src="/reading.png"
            fill
            alt="reading"
          />
          <Image
            className="hidden object-contain dark:block"
            src="/reading-dark.png"
            fill
            alt="reading"
          />
        </div>
      </div>
    </div>
  );
};
