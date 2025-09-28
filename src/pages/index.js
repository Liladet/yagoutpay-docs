import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

// Sparkle Component for animated background elements
function Sparkles() {
  return (
    <>
      <div className={`${styles.sparkle} ${styles.sparkle1}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle2}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle3}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle4}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle5}`}></div>
    </>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <Sparkles />
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            YagoutPay documentation
          </Heading>
          <Heading as="h2" className={styles.heroSubtitle}>
            Three payment method.
            <br />
            With different language.
          </Heading>
          <p className={styles.heroTagline}>
            This documentation describes the three payment method integration
            with YagoutPay, including hosted checkout, direct API integration,
            and static and dynamic payment method. Each method is explained in
            detail with code examples , api documentation and best practices to
            help you get started quickly and easily.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.tutorialButton}
              to="http://localhost:3000/yagoutpay-docs/docs/intro"
            >
              GET STARTED <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: "fas fa-shield-alt",
      title: "Python",
      description: "easy and secure payment integration with Python SDK",
    },
    {
      icon: "fas fa-bolt",
      title: "C#",
      description: "Fast and reliable payment processing with C# SDK",
    },
    {
      icon: "fas fa-plug",
      title: "Laravel",
      description: "Seamless payment integration with Laravel framework",
    },
    {
      icon: "fas fa-globe",
      title: "Node.js",
      description: "Scalable payment solutions with Node.js",
    },
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            This documentation will cover
          </Heading>
          <p className={styles.sectionSubtitle}>
            Different methods with different languages
          </p>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, idx) => (
            <div key={idx} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <i className={benefit.icon}></i>
              </div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationStages() {
  const stages = [
    {
      number: "1",
      title: "Stage 1: Hosted Checkout",
      description:
        "Launch with a seamless Python/Flask and React frontend integration.",
    },
    {
      number: "2",
      title: "Stage 2: Direct API Integration",
      description:
        "Implement direct API integration using four different language.",
    },
    {
      number: "3",
      title: "Stage 3: Static and dynamic payment method",
      description:
        "Implement static and dynamic payment methods with comprehensive guides.",
    },
  ];

  return (
    <section className={styles.stagesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Integration Journey
          </Heading>
          <p className={styles.sectionSubtitle}>
            Follow our structured stages to achieve a complete payment
            integration
          </p>
        </div>
        <div className={styles.stagesContainer}>
          {stages.map((stage, idx) => (
            <div key={idx} className={styles.stage}>
              <div className={styles.stageNumber}>{stage.number}</div>
              <div className={styles.stageContent}>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="YagoutPay payment integretion documentation"
    >
      <HomepageHeader />
      <main>
        <BenefitsSection />
        <HomepageFeatures />
        <IntegrationStages />
      </main>
    </Layout>
  );
}
