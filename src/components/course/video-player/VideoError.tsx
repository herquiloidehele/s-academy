"use client";

import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";

interface IVideoErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}
export default function VideoError(props: IVideoErrorProps) {
  return (
    <div className={"flex gap-3 flex-col justify-center items-center bg-black rounded-2xl h-[60vh]"}>
      <h1 className={"text-2xl text-white"}>Erro ao carregar o vídeo</h1>
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
