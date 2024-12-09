import React from "react";
import Link from "next/link";
import styles from "./Advertise.module.css";

const Advertise = () => {
  return (
    <section
      id="advertise"
      className={styles.advert}
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div>
        <div className={styles.advertise}>
          <span>Advertise in this space with Reskrow</span>
          <span>
            Do you want to advertise other real-estate products or services with Reskrow?
            <br />
            Get seen by our 10k+ daily site visitors!
          </span>
          <button>
            <Link href="/advertise">Get Started Now!</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Advertise;

