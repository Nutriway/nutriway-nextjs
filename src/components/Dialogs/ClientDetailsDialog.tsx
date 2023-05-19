'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import ClientDetails from '@/components/CRUD/ClientDetails';
import { Appointment } from '@/types/Appointment';
import { useRouter } from 'next/navigation';

export default async function ClientDetailsDialog({ info }: { info: Appointment }) {
    const router = useRouter();
    return (
        <Dialog.Root defaultOpen>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content
                    onCloseAutoFocus={() => {
                        router.back();
                    }}
                    className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                >
                    <ClientDetails info={info} />
                    <Dialog.Close asChild>
                        <button className="text-primary-300 hover:bg-gray-50 focus:shadow-primary-300 absolute top-[15px] right-[20px] flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
