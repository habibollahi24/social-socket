'use client';

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { Profile } from '@prisma/client';

type Props = {
  user: {
    imageUrl: string;
    firstName: string;
    lastName: string;
  };
};

export default function UserAvatar({ user }: Props) {
  // const { user } = useUser();

  return (
    <div className="flex justify-center items-center ">
      <div className="rounded-full size-24 object-cover border-2 border-gray-600 overflow-hidden ">
        {user?.imageUrl ? (
          <Image
            src={user?.imageUrl}
            width={100}
            height={100}
            alt="imageUrl"
            className="rounded-full size-24 object-cover border-2 border-gray-600 overflow-hidden"
          />
        ) : (
          <div className="capitalize flex justify-center items-center w-full h-24 text-4xl">
            <p>
              {user?.firstName && user.firstName[0]}.
              {user?.lastName && user.lastName[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
