"use client";

import Image from "next/image";
import HeroImage from "../../../public/FinalLogo.svg";
import Link from "next/link";
// import { Button } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 bg-white">

      <div className="relative">
        <h1 className="ml-[550px] absolute font-nav_link_font text-5xl text-[#245BA7] mt-28">Welcome to</h1>
        <Image src={HeroImage} alt="8Senses Logo" width={931} height={380} priority />
      </div>

      <p className="max-w-2xl text-2xl text-[#456696] mt-4 px-4">
        Empowering children to reach their full potential through specialized therapy and compassionate care.
      </p>

      <div className="mt-8 grid gap-4 md:flex md:space-x-6">
        <Button className="w-[250px] h-[60px] bg-[#C83C92] hover:bg-[#b8327f] text-white px-8 py-4 text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Make an appointment
        </Button>
        <Link href="/services">
          <Button className="w-[250px] h-[60px] border-2 border-[#C83C92] text-[#C83C92] hover:bg-[#fff] bg-white px-8 py-4 text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Explore our services
          </Button>
        </Link>
      </div>
    </section>
  );
}
