import { useTranslation } from "react-i18next";
import PageBanner from "../components/PageBanner";
import HistoryIntroSection from "../components/HistoryIntroSection";
import HistoryPostcardsSection from "../components/HistoryPostcardsSection";
import HistoryClosingSection from "../components/HistoryClosingSection";

function HistoryPage() {
  const { t } = useTranslation("history");
  const section1 = t("section1", { returnObjects: true });
  const section2 = t("section2", { returnObjects: true });

  return (
    <>
      <PageBanner title={t("title")} image="/images/roszkowice/remont/20231011_135743.jpg" />
      <HistoryIntroSection
        sectionLabel={t("intro.sectionLabel")}
        heading={t("intro.heading")}
        welcomeText={t("welcome.text", { ns: "home" })}
        imageSrc="/images/roszkowice/zewn/palac_dawniej.jpg"
        imageAlt={t("intro.heading")}
      />
      <HistoryPostcardsSection
        paragraphs={section1}
        imageSrc="/images/roszkowice/zewn/pocztowki.jpg"
        imageAlt={t("title")}
      />
      <HistoryClosingSection
        paragraphs={section2}
        seeBlogTitle={t("seeBlog")}
        imageSrc="/images/roszkowice/zewn/jesien.jpg"
        imageAlt={t("title")}
      />
    </>
  );
}

export default HistoryPage;
