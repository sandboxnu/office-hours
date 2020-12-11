import { ReactElement } from "react";
import { Insight } from "@koh/common";

interface SimpleDisplayComponentProps {
    insight: Insight;
}

export default function SimpleDisplayComponent({ insight }: SimpleDisplayComponentProps): ReactElement {
    return (
        <>
            <b>Title: {insight?.name ?? "...loading"}</b>
            <p>Data: {insight?.output?? "...loading"}</p>
        </>
    )
}
