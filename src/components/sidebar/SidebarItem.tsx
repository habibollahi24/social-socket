'use client';

import React from 'react';
import ToltipCTX from '../ToltipCTX';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  imageUrl: string;
  id: string;
};

export default function SidebarItem({ name, imageUrl, id }: Props) {
  const { serverId } = useParams();
  console.log(serverId);

  const activeSidebarItem = serverId === id;

  return (
    <Link href={`/server/${id}`} className="">
      <li
        className={cn(
          'rounded-[1.75rem] transition-all',
          'hover:border-4 hover:border-foreground ',
          {
            'border-4 border-foreground': activeSidebarItem,
          }
        )}
      >
        <ToltipCTX content={name}>
          <div className="size-16 relative ">
            <Image
              src={imageUrl}
              fill
              alt={name}
              className="object-cover rounded-3xl"
            />
          </div>
        </ToltipCTX>
      </li>
    </Link>
  );
}
