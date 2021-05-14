import React, { useCallback, useEffect, useState } from "react";

import { useSession } from "next-auth/client";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// @material-ui/icons
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import Skeleton from "@material-ui/lab/Skeleton";

import { Line, Pie } from "react-chartjs-2";

import exampleDataRunning from "./exampleDataRunning";
import exampleDataFunctional from "./exampleDataFunctional";

// core components
import Header from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import Button from "../../src/components/CustomButtons/Button";
import GridContainer from "../../src/components/Grid/GridContainer";
import GridItem from "../../src/components/Grid/GridItem";
import HeaderLinks from "../../src/components/Header/HeaderLinks";
import NavPills from "../../src/components/NavPills/NavPills";
import Parallax from "../../src/components/Parallax/Parallax";

import styles from "../../assets/jss/nextjs-material-kit/pages/profilePage";

const useStyles = makeStyles(styles);

function ProfilePage(props) {
  const classes = useStyles();
  const [session, loading] = useSession();
  const { t } = useTranslation();

  if (loading) {
    return <Skeleton variant="rect" height="100vh"/>;
  }

  if (!session) {
    return <div>Forbidden</div>;
  }

  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <div>
      <Header
        color="transparent"
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/ppl-cycling.jpeg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={
                        session.user.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {session.user.name
                        .split(" ")
                        .map(
                          name =>
                            name.charAt(0).toUpperCase() + name.substring(1)
                        )
                        .join(" ")}
                    </h3>
                    <h6>{session.user.email}</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className="fab fa-instagram" />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className="fab fa-facebook" />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: t("RUNNING_TAB"),
                      tabIcon: DirectionsRun,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={26} sm={26} md={10}>
                            <div className="chart">
                              <Line
                                data={exampleDataRunning}
                                options={{
                                  scales: {
                                    y: {
                                      beginAtZero: true,
                                    },
                                  },
                                }}
                                id="chart-sales"
                                className="chart-canvas"
                              />
                            </div>
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: t("FUNCTIONAL_TAB"),
                      tabIcon: FitnessCenter,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={5}>
                            <Pie
                              data={exampleDataFunctional}
                              options={{
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                  },
                                },
                              }}
                              id="chart-sales"
                              className="chart-canvas"
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
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

export default ProfilePage;
