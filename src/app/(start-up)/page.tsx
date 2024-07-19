import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import InitialModal from '@/components/modals/InitialModal';

import { RedirectToSignIn } from '@clerk/nextjs';

export default async function Home() {
  //به محظ بالا امدن برنامه باید چک بشه که اگه کاربر تو دیتابیس نیس ریخته بشه

  const user = await currentUser();
  if (!user) return RedirectToSignIn;

  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) {
    const server = await db.server.findFirst({
      where: { members: { some: { profileId: profile?.id } } },
    });
    if (server) {
      return redirect(`server/${server.id}`);
    }
  } else {
    await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  //اینجا در صورتی هست که کاربر دفعه اولشه که اومده

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen ">
      <h1 className="text-4xl font-semibold">Welcome To Saeb Mesenger</h1>
      <p className="mb-5">plese start by create a server</p>
      <InitialModal />
    </div>
  );
}
