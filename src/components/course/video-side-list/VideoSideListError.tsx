"use client";

import { IComponentErrorProps } from "@/utils/interfaces";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";

export default function VideoSideListError(props: IComponentErrorProps) {
  return (
    <div className={"flex flex-col gap-3"}>
      <p>Não foi possível carregar os módulos</p>

      <ButtonElement
        shape={ButtonShape.SQUARE}
        size={ButtonSize.SMALL}
        fillType={FillType.FILLED}
        type={ButtonType.PRIMARY}
        onClick={props.resetErrorBoundary}
      >
        Tentar novamente
      </ButtonElement>
    </div>
  );
}
