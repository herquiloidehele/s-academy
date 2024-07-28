import { clsx } from "clsx";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";

export enum MenuActionType {
  LINK = "LINK",
  ACTION = "ACTION",
  BUTTON = "BUTTON",
}

export type IMenuItem =
  | {
      text: string;
      actionType: MenuActionType.ACTION | MenuActionType.BUTTON;
      action: () => void;
    }
  | {
      text: string;
      actionType: MenuActionType.LINK;
      href: string;
    };

interface IMenuItemProps {
  menuItem: IMenuItem;
  className?: string;
}
export default function MenuItem(props: IMenuItemProps) {
  if (props.menuItem.actionType === MenuActionType.BUTTON) {
    return (
      <ButtonElement
        type={ButtonType.PRIMARY}
        fillType={FillType.FILLED}
        size={ButtonSize.SMALL}
        shape={ButtonShape.ROUNDED}
        shadow
        onClick={props.menuItem.action}
      >
        {props.menuItem.text}
      </ButtonElement>
    );
  }

  if (props.menuItem.actionType === MenuActionType.ACTION) {
    return (
      <li className={`hidden md:inline-block ${props.className}`}>
        <div
          className={clsx("text-stale-950 font-medium text-sm lg:text-md hover:text-green-400 text-black")}
          onClick={(event) => {
            if (props.menuItem.actionType === MenuActionType.ACTION) {
              event.preventDefault();
              props.menuItem.action();
            }
          }}
        >
          {props.menuItem.text}
        </div>
      </li>
    );
  }

  if (props.menuItem.actionType === MenuActionType.LINK) {
    return (
      <li className={`hidden md:inline-block ${props.className}`}>
        <a
          href={props.menuItem.href}
          className={clsx("text-stale-950 font-medium text-sm lg:text-md hover:text-green-400 text-black")}
        >
          {props.menuItem.text}
        </a>
      </li>
    );
  }
}
