'use client';
import React, { useCallback } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CoolDialog() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // this allows us to create a new query string with the new value
    // could be used to maintain the state between refreshes
    // Do not do this for all the forms, but instead something like it completely
    // changes the page.

    // E.G. Do not use it on checkboxes or radio buttons, inputs of any type. Use useState instead
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    return (
        <AlertDialog.Root open>
            <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Are you absolutely sure?</AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialog.Description>
                <div className="flex justify-end gap-[25px]">
                    <AlertDialog.Cancel asChild>
                        <Link
                            className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                            href={
                                // <pathname>?sort=desc
                                pathname + '?' + createQueryString('sort', 'desc')
                            }
                        >
                            Cancel
                        </Link>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <Link
                            className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                            href={
                                // <pathname>?sort=desc
                                pathname + '?' + createQueryString('potato', 'yup')
                            }
                        >
                            Yes, delete account
                        </Link>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}
