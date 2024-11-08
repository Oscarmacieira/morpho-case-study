"use client";

import { LogoSvg } from "../../components/svgs/LogoSvg";
import { AccountButton } from "../auth/AccountButton";

export const Navbar = () => {
  return (
    <header className="h-[50px] border-b-[0.5px] border-[#434C53]/15 backdrop-blur-[100px] flex items-center">
      <div className="flex items-center justify-between w-full px-3 max-w-[1440px] mx-auto md:px-10">
        <div className="flex items-center gap-2">
          <LogoSvg />
          <h1 className="text-[13px] font-normal leading-6 text-body opacity-95">
            Morpho Test
          </h1>
        </div>
        <AccountButton />
      </div>
    </header>
  );
};
