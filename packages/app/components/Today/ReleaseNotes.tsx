import { Modal, notification } from "antd";
import { ReactElement, useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { NotionRenderer } from "react-notion";

export default function ReleaseNotes(): ReactElement {
  const [releaseNotesLastSeen, setReleaseNotesLastSeen] = useLocalStorage(
    "releaseNotesLastSeen",
    null
  );
  const [releaseNotesLastUpdated, setReleaseNotesLastUpdated] = useState(0);
  const [notionReleaseNotes, setNotionReleaseNotes] = useState();
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  if (!releaseNotesLastSeen) {
    setReleaseNotesLastSeen(new Date());
  }

  useEffect(() => {
    fetch(
      "https://notion-api.splitbee.io/v1/page/abba246bfa0847baa2706ab30d0c6c7d"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          const timeText =
            result["beae2a02-249e-4b61-9bfc-81258d93f20d"]?.value?.properties
              ?.title[0][0];
          setReleaseNotesLastUpdated(timeText.split("Unix ")[1] * 1000);
          // Remove the time block and page link block from page
          result["beae2a02-249e-4b61-9bfc-81258d93f20d"].value.properties.title = []
          result["4d25f393-e570-4cd5-ad66-b278a0924225"].value.properties.title = []
          setNotionReleaseNotes(result);
        },
        (error) => {
          console.log("Error fetching release notes", error);
        }
      );
  }, []);

  if (new Date(releaseNotesLastSeen) < new Date(releaseNotesLastUpdated)) {
    notification.open({
      message: "We've got new features/bug fixes",
      type: "info",
      description: "Click to see what's new!",
      duration: 0,
      onClick: () => {
        setShowReleaseNotes(true);
        notification.destroy();
      },
    });
    setReleaseNotesLastSeen(new Date());
  }

  return (
    <div>
      {notionReleaseNotes ? (
        <Modal
          title={"Release Notes"}
          visible={showReleaseNotes}
          footer={<><b>Want to see more? </b><a href="https://www.notion.so/Release-Notes-Archive-9a1a0eab073a463096fc3699bf48219c"> Click here to view the archive</a></>}
          width={625}
          onCancel={() => setShowReleaseNotes(false)}
        >
          <NotionRenderer blockMap={notionReleaseNotes} />
        </Modal>
      ) : null}
    </div>
  );
}
