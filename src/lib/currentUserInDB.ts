import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Profile } from '@prisma/client';

export async function currentUserInDB(): Promise<Profile | null> {
  const { userId } = auth();
  if (!userId) return null;

  const profile = await db.profile.findUnique({ where: { userId: userId } });
  if (!profile) return null;

  return profile;
}
