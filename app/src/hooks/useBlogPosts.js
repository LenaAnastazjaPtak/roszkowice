import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const VITE_API_URL = import.meta.env.VITE_API_URL;
if (!VITE_API_URL) {
  throw new Error("Missing required env variable: VITE_API_URL");
}

export function useBlogPosts() {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const locale = i18n.language?.slice(0, 2) ?? "pl";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${VITE_API_URL}/api/posts?locale=${locale}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const getLatestPosts = useCallback(
    (count = 3) => posts.slice(0, count),
    [posts],
  );

  return { posts, loading, error, getLatestPosts };
}
