import React from 'react';
import ToltipCTX from '../ToltipCTX';
import ToggleTheme from '../ToggleTheme';
import { Button } from '../ui/button';
import { SignOutButton } from '@clerk/nextjs';
import { HiArrowRightStartOnRectangle } from 'react-icons/hi2';

export default function SidebarMode() {
  return (
    <div className=" pt-2 flex flex-col items-center bg-slate-100 dark:bg-zinc-900 h-full">
      <ToltipCTX content="Theme">
        <div>
          <ToggleTheme />
        </div>
      </ToltipCTX>
      <ToltipCTX content="Exit">
        <div className="cursor-pointer">
          <SignOutButton redirectUrl="/">
            <div className="flex gap-x-0 items-center">
              <span>EXIT</span>
              <HiArrowRightStartOnRectangle className="text-3xl" />
            </div>
          </SignOutButton>
        </div>
      </ToltipCTX>
    </div>
  );
}
