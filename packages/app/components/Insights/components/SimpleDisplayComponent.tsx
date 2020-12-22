import { ReactElement } from "react";
import { SimpleDisplayOutputType } from "@koh/common";

interface SimpleDisplayComponentProps {
  name: string;
  output: SimpleDisplayOutputType;
}

export default function SimpleDisplayComponent({
  name,
  output,
}: SimpleDisplayComponentProps): ReactElement {
  return (
    <>
      <h1>{output ?? "...loading"}</h1>
    </>
  );
}
