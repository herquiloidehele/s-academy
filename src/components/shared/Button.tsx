import { Button } from "@headlessui/react";
import React, { useMemo } from "react";
import { clsx } from "clsx";
import SpinnerIcon from "@/assets/icons/spinner-icon.svg";

export enum ButtonType {
  PRIMARY = "primary",
  SUBMIT = "submit",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ButtonShape {
  ROUNDED = "rounded",
  SQUARE = "square",
}

export enum FillType {
  FILLED = "filled",
  OUTLINE = "outline",
}

interface ButtonProps {
  type: ButtonType;
  children: React.ReactNode;
  fillType: FillType;
  className?: string;
  size: ButtonSize;
  shape: ButtonShape;
  animate?: boolean;
  shadow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ButtonElement(props: ButtonProps) {
  const buttonTypeClass: Record<ButtonType, string> = {
    [ButtonType.SUBMIT]: "bg-green-400",
    [ButtonType.PRIMARY]: "bg-green-400",
    [ButtonType.SECONDARY]: "bg-blue-950",
    [ButtonType.TERTIARY]: "bg-gray-400",
  };

  const buttonBorderClass: Record<ButtonType, string> = {
    [ButtonType.SUBMIT]: "border-green-400",
    [ButtonType.PRIMARY]: "border-green-400",
    [ButtonType.SECONDARY]: "border-blue-950",
    [ButtonType.TERTIARY]: "border-gray-400",
  };

  const buttonSizeClass: Record<ButtonSize, string> = {
    [ButtonSize.SMALL]: "py-2 px-4 text-sm",
    [ButtonSize.MEDIUM]: "px-5 py-3",
    [ButtonSize.LARGE]: "px-8 py-5",
  };

  const buttonFillTypeClass: Record<FillType, string> = {
    [FillType.FILLED]: "text-primary-foreground",
    [FillType.OUTLINE]: "bg-transparent text-card-foreground border-2 ",
  };

  const buttonBaseClasses = useMemo(() => {
    return clsx("", {
      [`${buttonFillTypeClass[props.fillType]} ${buttonTypeClass[props.type]}`]: props.fillType === FillType.FILLED,
      [`${buttonFillTypeClass[props.fillType]} ${buttonBorderClass[props.type]}`]: props.fillType === FillType.OUTLINE,
    });
  }, [props.type, props.fillType]);

  const buttonShapeClass: Record<ButtonShape, string> = {
    [ButtonShape.ROUNDED]: "rounded-3xl",
    [ButtonShape.SQUARE]: "rounded-md",
  };

  return (
    <Button
      onClick={props.onClick}
      className={clsx(
        `${buttonBaseClasses} ${buttonSizeClass[props.size]} ${buttonShapeClass[props.shape]} ${props.className} font-bold`,
        {
          "animate-blurred-fade-in animate-delay-800": props.animate,
          "shadow-2xl shadow-green-400  shadow-[5px_3px_60px_-8px] hover:bg-green-300": props.shadow,
        },
      )}
      disabled={props.disabled}
    >
      {props.isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 border-t-2 border-b-2 border-green-400 rounded-full animate-spin">
            <SpinnerIcon className="w-full h-full text-green-400" />
          </div>
        </div>
      ) : (
        props.children
      )}
    </Button>
  );
}
