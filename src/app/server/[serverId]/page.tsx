import React from 'react';

export default async function ServerIdPage({
  params,
}: {
  params: { serverId: string };
}) {
  return <div>ServerIdPage / {params.serverId}</div>;
}
