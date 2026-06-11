import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPostDate } from "../shared/formatDate.js";
import { buildPostPath } from "../shared/postUrl";

function LatestPostsWidget({ posts }) {
  const { t, i18n } = useTranslation("blog");

  return (
    <aside className="widget widget_latestpost">
      <h3 className="widget-title">{t("latestPosts")}</h3>
      {posts.map((item) => {
        const { day, month, year } = formatPostDate(
          item.publishedAt,
          i18n.language,
        );
        const postUrl = buildPostPath(item);
        return (
          <div key={item.id} className="latestpost-content">
            <Link to={postUrl} title={t("coverTitle")}>
              <img src={item.image} alt={item.title} />
            </Link>
            <h3>
              <Link to={postUrl} title={item.title}>
                {item.title}
              </Link>
            </h3>
            <span>{`${day} ${month} ${year}`}</span>
          </div>
        );
      })}
    </aside>
  );
}

export default LatestPostsWidget;
