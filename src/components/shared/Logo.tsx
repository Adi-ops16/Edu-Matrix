import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-1 items-center">
      <Image
        className="object-contain"
        alt="Logo"
        width={50}
        height={50}
        src={"/logo.png"}
      />
      <div>
        <h1 className="text-primary font-bold text-lg">Edu-matrix</h1>
      </div>
    </div>
  );
}
