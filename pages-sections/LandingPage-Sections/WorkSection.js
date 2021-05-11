import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import { useTranslation } from "next-i18next";

// core components
import GridContainer from "../../src/components/Grid/GridContainer";
import GridItem from "../../src/components/Grid/GridItem";
import CustomInput from "../../src/components/CustomInput/CustomInput";
import Button from "../../src/components/CustomButtons/Button";

import styles from "../../assets/jss/nextjs-material-kit/pages/landingPageSections/workStyle";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  const { t } = useTranslation("common");

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>{t("CONTACT_US")}</h2>
          <h4 className={classes.description}>{t("CONTACT_US_MESSAGE")}</h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText={t("YOUR_NAME")}
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText={t("YOUR_EMAIL")}
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <CustomInput
                labelText={t("YOUR_MESSAGE")}
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
              <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button color="primary">{t("SEND_MESSAGE")}</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
