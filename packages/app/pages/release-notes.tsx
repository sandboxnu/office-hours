import { Button } from "antd";
import styled from "styled-components";
import { ReactElement } from "react";
import { useDefaultCourseRedirect } from "../hooks/useDefaultCourseRedirect";
import { User } from "@koh/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";
import { BlockMapType, NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/abba246bfa0847baa2706ab30d0c6c7d"
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
  };
}

interface props {
  blockMap: BlockMapType;
}

export default function ReleaseNotes({ blockMap }: props): ReactElement {
  return (
    <div style={{ maxWidth: 768 }}>
      <NotionRenderer blockMap={blockMap} />
    </div>
  );
}
