import { useTranslation } from "react-i18next";
import YouTubeEmbed from "../components/YouTubeEmbed";
import PageBanner from "../components/PageBanner";
import OnviewSection from "../components/OnviewSection";

function AboutPage() {
  const { t } = useTranslation("about");

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/park/IMG_0345.jpg"
      />
      <OnviewSection showGalleryLink />
      <YouTubeEmbed url="https://www.youtube.com/watch?v=2OQFaQRg9-4" />
    </>
  );
}

export default AboutPage;
