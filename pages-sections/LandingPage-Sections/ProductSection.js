import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "next-i18next";

// @material-ui/icons
import ListAlt from "@material-ui/icons/ListAlt";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import AttachMoney from "@material-ui/icons/AttachMoney";
// core components
import GridContainer from "../../src/components/Grid/GridContainer";
import GridItem from "../../src/components/Grid/GridItem";
import InfoArea from "../../src/components/InfoArea/InfoArea";

import styles from "../../assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const { t } = useTranslation("common");

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{t("TALK_PRODUCT")}</h2>
          <h5 className={classes.description}>
            {t("PRODUCT_MESSAGE")}
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title={t("TRAINING_SHEET")}
              description={t("TRAINING_SHEET_DESCR")}
              icon={ListAlt}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title={t("VERIFIED_CLUBS")}
              description={t("VERIFIED_CLUBS_DESCR")}
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title={t("FINANTIAL")}
              description={t("FINANTIAL_DESCR")}
              icon={AttachMoney}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
