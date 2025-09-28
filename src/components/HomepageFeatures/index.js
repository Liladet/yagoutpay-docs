import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Merchant",
    Icon: () => <i className="fas fa-store"></i>,
    description: (
      <>
        Easily integrate YagoutPay into your e-commerce platform with our
        documentation.
      </>
    ),
  },
  {
    title: "Developer",
    Icon: () => <i className="fas fa-code"></i>,
    description: (
      <>
        Integrate YagoutPay seamlessly into your applications with our
        developer-friendly documentation.
      </>
    ),
  },
  {
    title: "user",
    Icon: () => <i className="fas fa-person"></i>,
    description: <>Any one who want to use this payment method</>,
  },
];

function Feature({ Icon, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <Icon />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Who can use this documentation?
          </Heading>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
