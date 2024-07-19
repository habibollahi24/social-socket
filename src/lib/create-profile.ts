import { currentUser } from '@clerk/nextjs/server';
import { db } from './db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { Profile } from '@prisma/client';

export async function createProfile(): Promise<Profile> {
  const user = await currentUser();

  // (user.id);
  // (user.firstName);
  // (user.lastName);

  if (!user) return RedirectToSignIn as any;

  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
}
