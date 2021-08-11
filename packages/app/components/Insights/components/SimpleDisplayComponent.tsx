import { ReactElement } from "react";
import { SimpleDisplayOutputType } from "@koh/common";

interface SimpleDisplayComponentProps {
  output: SimpleDisplayOutputType;
}

export default function SimpleDisplayComponent({
  output,
}: SimpleDisplayComponentProps): ReactElement {
  return (
    <>
      <h1>{output}</h1>
    </>
  );
}
