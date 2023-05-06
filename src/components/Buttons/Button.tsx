import React, { FC } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonClasses = cva([
        "rounded-3xl",
        "font-bold",
        "hover:scale-110",
        "active:scale-100",
        "transition",
        "duration-200",
        "ease-in-out"
    ],
    {
        variants: {
            intent: {
                primary-900
:
[
    "bg-violet-500",
    "text-white",
    "border-transparent",
    "hover:bg-violet-600"
],
    secondary;
:
[
    "bg-white",
    "text-black",
    "border-gray-400",
    "hover:bg-gray-100",
    "border-solid",
    "border-2",
    "border-gray-800"
],
    text;
:
["bg-transparent", "text-black", "hover:bg-gray-100"];
},
size: {
    small: ["text-md", "py-1", "px-2"],
        medium;
:
    ["text-lg", "px-6", "py-2"],
        large;
:
    ["text-xlg", "px-8", "py-4"];
}
},
defaultVariants: {
    intent: "primary-900",
        size;
:
    "medium";
}
})
;

export type ButtonProps =
    {
        type?: "submit" | "reset" | "button" | undefined; // if the button is in a form
    }
    & VariantProps<typeof buttonClasses>
    & React.HTMLAttributes<HTMLButtonElement>;


const Button: FC<ButtonProps> = ({ children, intent, size, className, ...props }) => {
    return (
        <button className={buttonClasses({ intent, size, className })} {...props}>
            {children}
        </button>
    );
};

export default Button;
