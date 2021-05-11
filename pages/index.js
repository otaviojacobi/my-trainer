import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// core components
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import Button from "../src/components/CustomButtons/Button";
import HeaderLinks from "../src/components/Header/HeaderLinks";
import Parallax from "../src/components/Parallax/Parallax";

import styles from "../assets/jss/nextjs-material-kit/pages/landingPage";

// Sections for this page
import ProductSection from "../pages-sections/LandingPage-Sections/ProductSection";
import WorkSection from "../pages-sections/LandingPage-Sections/WorkSection";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const { t } = useTranslation("common");

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter responsive image={require("../assets/img/run.jpeg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>{t("YOUR_STORY")}</h1>
              <h4>
                {t("WANTS_TO_START_MESSAGE")}
                <br />
                {t("WANTS_TO_GROW_MESSAGE")}
                <br />
                {t("WANTS_TO_SIMPLE_MESSAGE")}
                <br />
                {t("WE_COVERED_MESSAGE")}
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                {t("WATCH_VIDEO")}
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default LandingPage;
