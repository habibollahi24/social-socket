'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import UserAvatar from '../UserAvatar';
import { useRouter } from 'next/navigation';

export default function InitialModal() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const handleForm = async (values: z.infer<typeof formSchema>) => {
    const data = { ...values, imageUrl: user?.imageUrl };

    try {
      const response = await axios.post('/api/create-server', data);

      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log('[INITIAL_MODAL]', error);
    }
  };

  if (!isLoaded) return <p>loading</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="animation-scale px-16">Lets Go</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Jump into the server</DialogTitle>
          <DialogDescription>
            Make changes to your server by name and Image.
          </DialogDescription>
        </DialogHeader>

        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleForm)}
              className="space-y-3"
            >
              <UserAvatar user={user as any} />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Server Name</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name"
                        className="border-gray-600 !mt-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="!mt-0" />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="animation-scale disabled:animate-none"
                >
                  {form.formState.isSubmitting ? 'loading...' : 'Create Server'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadThingComp
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="!mt-0" />
                  </FormItem>
                )}
              /> */
}
