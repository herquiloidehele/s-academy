import { Button } from "@headlessui/react";
import React, { useMemo } from "react";
import { clsx } from "clsx";

export enum ButtonType {
  PRIMARY = "primary",
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
}

export default function ButtonElement(props: ButtonProps) {
  const buttonTypeClass: Record<ButtonType, string> = {
    [ButtonType.PRIMARY]: "bg-green-400",
    [ButtonType.SECONDARY]: "bg-blue-950",
    [ButtonType.TERTIARY]: "bg-gray-400",
  };

  const buttonBorderClass: Record<ButtonType, string> = {
    [ButtonType.PRIMARY]: "border-green-400",
    [ButtonType.SECONDARY]: "border-blue-950",
    [ButtonType.TERTIARY]: "border-gray-400",
  };

  const buttonSizeClass: Record<ButtonSize, string> = {
    [ButtonSize.SMALL]: "py-2 px-4",
    [ButtonSize.MEDIUM]: "px-5 py-3",
    [ButtonSize.LARGE]: "px-8 py-5",
  };

  const buttonFillTypeClass: Record<FillType, string> = {
    [FillType.FILLED]: "text-white",
    [FillType.OUTLINE]: "bg-transparent text-white border-2 ",
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
      className={clsx(
        `${buttonBaseClasses} ${buttonSizeClass[props.size]} ${buttonShapeClass[props.shape]} ${props.className} font-bold`,
        {
          "animate-blurred-fade-in animate-delay-800": props.animate,
          "shadow-2xl shadow-green-400  shadow-[5px_3px_60px_-8px] hover:bg-green-300": props.shadow,
        },
      )}
    >
      {props.children}
    </Button>
  );
}
