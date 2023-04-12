"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";

export default function HomeCheck() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // get the value of the "potato" query param
    const checked = searchParams.get("potato") === "true";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <div className="flex items-center">
            <Link
                // which is set here for the next navigation
                href={pathname + "?" + createQueryString("potato", `${!checked}`)} shallow>
                <Checkbox.Root
                    className="shadow-blackA7 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                    id="c1"
                    checked={checked}
                >
                    <Checkbox.Indicator className="text-violet11">
                        <CheckIcon />
                    </Checkbox.Indicator>
                </Checkbox.Root>
            </Link>

            <label className="pl-[15px] text-[15px] leading-none text-white" htmlFor="c1">
                Accept terms and conditions.
            </label>
        </div>

    );
}
