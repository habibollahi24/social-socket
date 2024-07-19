'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModal } from '@/context/ModalContext';
import React, { useEffect } from 'react';

export default function ClientRoute() {
  const { openEdit, setOpenEdit, openDelete, setOpenDelete } = useModal();
  // const [openEdit, setOpenEdit] = React.useState(false);
  // const [openDelete, setOpenDelete] = React.useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpenDelete(false);
  //   }, 3000);
  // }, [openDelete, openEdit]);

  return (
    <div>
      ClientRoute
      <div className="gap-x-2 flex">
        <Button onClick={() => setOpenDelete(true)}>open delete</Button>
        <Button onClick={() => setOpenEdit(true)}>open edit</Button>

        <Button onClick={() => setOpenDelete(true)}>close delete</Button>
        <Button onClick={() => setOpenEdit(false)}>close edit</Button>
      </div>
    </div>
  );
}

export const EditModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <p>EDIT</p>
          <DialogFooter>
            <Button type="submit" className="">
              Save changes
            </Button>
            <DialogClose>close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
export const DeleteModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <p>EDIT</p>
          <DialogFooter>
            <Button type="submit" className="">
              Save changes
            </Button>
            <DialogClose>close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
