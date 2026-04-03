import { useTranslation } from "react-i18next";
import PageBanner from "../components/PageBanner";

const SITE_URL = "https://palacroszkowice.pl";

function PrivacyPolicyPage() {
  const { t, i18n } = useTranslation("privacy");
  const { t: tCommon } = useTranslation("common");

  return (
    <>
      <PageBanner
        title={tCommon("footer.privacy")}
        image="/images/roszkowice/zewn/DSC09468.JPG"
      />
      <div className="container-fluid no-padding welcome-section2 privacy-policy-page">
        <div className="container">
          <div className="row">
            <div
              className="col-xs-12 privacy-policy-inner"
              lang={i18n.language}
            >
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>1.</span>
                  <h2>{t("s1_h")}</h2>
                </div>
                <ol>
                  <li>
                    {t("s1_l1_before")}{" "}
                    <a
                      href={SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("s1_l1_link")}
                    </a>
                  </li>
                  <li>{t("s1_l2")}</li>
                  <li>
                    {t("s1_l3_before")}{" "}
                    <a href="mailto:hubert.adamczak@palacroszkowice.pl">
                      hubert.adamczak@palacroszkowice.pl
                    </a>
                  </li>
                  <li>{t("s1_l4")}</li>
                  <li>
                    {t("s1_l5_intro")}
                    <ul>
                      <li>{t("s1_l5_u1")}</li>
                      <li>{t("s1_l5_u2")}</li>
                      <li>{t("s1_l5_u3")}</li>
                    </ul>
                  </li>
                  <li>
                    {t("s1_l6_intro")}
                    <ol>
                      <li>{t("s1_l6_o1")}</li>
                      <li>{t("s1_l6_o2")}</li>
                    </ol>
                  </li>
                </ol>
              </div>
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>2.</span>
                  <h2>{t("s2_h")}</h2>
                </div>
                <ol>
                  <li>{t("s2_l1")}</li>
                  <li>{t("s2_l2")}</li>
                  <li>{t("s2_l3")}</li>
                  <li>{t("s2_l4")}</li>
                  <li>{t("s2_l5")}</li>
                  <li>{t("s2_l6")}</li>
                </ol>
              </div>
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>3.</span>
                  <h2>{t("s3_h")}</h2>
                </div>
                <ol>
                  <li>
                    {t("s3_l1_intro")}
                    <ul>
                      <li>{t("s3_l1_u1")}</li>
                    </ul>
                  </li>
                  <li>{t("s3_l2")}</li>
                  <li>
                    {t("s3_l3_intro")}
                    <ul>
                      <li>{t("s3_l3_u1")}</li>
                      <li>{t("s3_l3_u2")}</li>
                      <li>{t("s3_l3_u3")}</li>
                      <li>{t("s3_l3_u4")}</li>
                      <li>{t("s3_l3_u5")}</li>
                    </ul>
                  </li>
                  <li>{t("s3_l4")}</li>
                  <li>{t("s3_l5")}</li>
                  <li>{t("s3_l6")}</li>
                  <li>{t("s3_l7")}</li>
                  <li>{t("s3_l8")}</li>
                </ol>
              </div>
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>4.</span>
                  <h2>{t("s4_h")}</h2>
                </div>
                <ol>
                  <li>{t("s4_l1")}</li>
                  <li>{t("s4_l2")}</li>
                  <li>{t("s4_l3")}</li>
                  <li>{t("s4_l4")}</li>
                </ol>
              </div>
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>5.</span>
                  <h2>{t("s5_h")}</h2>
                </div>
                <ol>
                  <li>{t("s5_l1")}</li>
                </ol>
              </div>
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>6.</span>
                  <h2>{t("s6_h")}</h2>
                </div>
                <ol>
                  <li>
                    {t("s6_l1_before")}{" "}
                    <a
                      href={t("s6_l1_link")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("s6_l1_link")}
                    </a>
                  </li>
                  <li>{t("s6_l2")}</li>
                  <li>{t("s6_l3")}</li>
                  <li>{t("s6_l4")}</li>
                </ol>
              </div>
              <div className="privacy-policy-section">
                <div className="section-header2">
                  <span>7.</span>
                  <h2>{t("s7_h")}</h2>
                </div>
                <ol>
                  <li>{t("s7_l1")}</li>
                  <li>{t("s7_l2")}</li>
                  <li>{t("s7_l3")}</li>
                  <li>
                    {t("s7_l4_intro")}
                    <ol>
                      <li>{t("s7_l4_o1")}</li>
                      <li>{t("s7_l4_o2")}</li>
                    </ol>
                  </li>
                  <li>{t("s7_l5")}</li>
                  <li>{t("s7_l6")}</li>
                  <li>{t("s7_l7")}</li>
                  <li>{t("s7_l8")}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-100"></div>
    </>
  );
}

export default PrivacyPolicyPage;
