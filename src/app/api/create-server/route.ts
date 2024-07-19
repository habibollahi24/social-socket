import { currentUserInDB } from '@/lib/currentUserInDB';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const profile = await currentUserInDB();
  const { name, imageUrl } = await request.json();

  if (!profile)
    return Response.json({ message: 'unauthorize' }, { status: 401 });

  try {
    const server = await db.server.create({
      data: {
        name: name,
        imageUrl: imageUrl,
        inviteCode: uuidv4(),
        profileId: profile.id,
        channels: {
          create: [{ profileId: profile.id, name: 'general' }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return Response.json(server, { status: 201 });
  } catch (error) {
    console.log('[CREATE_SERVER]', error);
    return Response.json('Internal errrror', { status: 500 });
  }
}
