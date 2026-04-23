import { useEffect } from "react";

function OpenPostAction(props) {
  const postId = props?.record?.params?.id;

  useEffect(() => {
    if (!postId) {
      return;
    }

    window.open(`http://localhost:5173/blog/post/${postId}`, "_blank", "noopener,noreferrer");
    window.history.back();
  }, [postId]);

  return null;
}

export default OpenPostAction;
