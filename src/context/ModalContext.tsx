'use client';

import { DeleteModal, EditModal } from '@/app/server/[serverId]/ClientRoute';
import React, { createContext, useContext } from 'react';

type Props = {
  openEdit: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const CTX = createContext({} as Props);

export default function ModalContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  return (
    <CTX.Provider value={{ openEdit, setOpenEdit, openDelete, setOpenDelete }}>
      {children}

      <EditModal open={openEdit} setOpen={setOpenEdit} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
    </CTX.Provider>
  );
}

export const useModal = () => {
  return useContext(CTX);
};
