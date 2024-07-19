import { currentUserInDB } from '@/lib/currentUserInDB';
import { db } from '@/lib/db';
import SidebarMode from './SidebarMode';
import SidebarItem from './SidebarItem';

export default async function SidebarAction() {
  const profile = await currentUserInDB();

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile?.id } } },
  });

  return (
    <div>
      <nav className="w-32  pt-6 p-2 flex flex-col items-center bg-slate-100 dark:bg-zinc-900 h-[80vh] overflow-y-auto ">
        <ul>
          {servers.map((s) => {
            return (
              <SidebarItem
                id={s.id}
                key={s.id}
                imageUrl={s.imageUrl}
                name={s.name}
              />
            );
          })}
        </ul>
      </nav>
      <SidebarMode />
    </div>
  );
}
