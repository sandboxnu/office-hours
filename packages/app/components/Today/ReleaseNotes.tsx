import { Modal, notification } from "antd";
import { ReactElement, useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { NotionRenderer, BlockMapType } from "react-notion";
import { API } from "@koh/api-client";

export default function ReleaseNotes(): ReactElement {
  const [releaseNotesLastSeen, setReleaseNotesLastSeen] = useLocalStorage(
    "releaseNotesLastSeen",
    null
  );
  const [releaseNotesLastUpdated, setReleaseNotesLastUpdated] = useState(0);
  const [notionReleaseNotes, setNotionReleaseNotes] = useState<BlockMapType>();
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await API.releaseNotes.get()
      setNotionReleaseNotes(data.releaseNotes as BlockMapType)
      setReleaseNotesLastUpdated(data.lastUpdatedUnixTime);
    })();
  }, []);

  if (
    (!releaseNotesLastSeen && releaseNotesLastUpdated) ||
    new Date(releaseNotesLastSeen) < new Date(releaseNotesLastUpdated)
  ) {
    notification.open({
      message: "We've got new features/bug fixes",
      type: "info",
      duration: 0,
      description: "Click to see what's new!",
      className: "clickable-notification hide-in-percy",
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowReleaseNotes(true);
        notification.destroy();
      },
    });
    setReleaseNotesLastSeen(new Date());
  }

  const openLinksInNewTab = (e) => {
    if (e.target.className === "notion-link") {
      e.preventDefault();
      window.open(e.target.href);
    }
  };

  return (
    <div onClick={openLinksInNewTab}>
      {notionReleaseNotes ? (
        <Modal
          title={"Release Notes"}
          visible={showReleaseNotes}
          bodyStyle={{ padding: "0px 24px" }}
          footer={
            <>
              <b>Want to see more? </b>
              <a href="https://www.notion.so/Release-Notes-Archive-9a1a0eab073a463096fc3699bf48219c">
                {" "}
                Click here to view the archive
              </a>
            </>
          }
          width={625}
          onCancel={() => setShowReleaseNotes(false)}
        >
          <NotionRenderer blockMap={notionReleaseNotes} />
        </Modal>
      ) : null}
    </div>
  );
}
