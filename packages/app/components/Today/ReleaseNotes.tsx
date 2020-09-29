import { Modal, notification } from "antd";
import { ReactElement, useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { NotionRenderer } from "react-notion";


export default function ReleaseNotes(): ReactElement {
  const [releaseNotesLastSeen, setReleaseNotesLastSeen] = useLocalStorage("releaseNotesLastSeen", null);
  const [releaseNotesLastUpdated, setReleaseNotesLastUpdated] = useState(new Date(0));
  const [notionReleaseNotes, setNotionReleaseNotes] = useState();
  const [showReleaseNotes, setShowReleaseNotes]  = useState(false);

  useEffect(() => {
    fetch("https://notion-api.splitbee.io/v1/page/abba246bfa0847baa2706ab30d0c6c7d")
      .then((res) => res.json())
      .then(
        (result) => {
            const text = result["beae2a02-249e-4b61-9bfc-81258d93f20d"]?.value?.properties?.title[0][0]
            console.log("text", text)
            setReleaseNotesLastUpdated(new Date(text.split("Unix ")[1] * 1000))
            // TODO: Remove the last updated property from the notion response
            setNotionReleaseNotes(result);
        },
        (error) => {
          console.log("Error fetching release notes", error)
        }
      )
  }, [])


  if (new Date(releaseNotesLastSeen) < releaseNotesLastUpdated) {
    setReleaseNotesLastSeen(new Date())
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
  }
  
  return (<div>
      {notionReleaseNotes ?
      <Modal
      visible={showReleaseNotes}
      footer={null}
      width={625}
      onCancel={() => setShowReleaseNotes(false)}
      >
      <div>
        <NotionRenderer blockMap={notionReleaseNotes} />
      </div> 
    </Modal>
      : null}
      </div>
  );
}
