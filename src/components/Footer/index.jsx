import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>WebModel</h5>
            <p className={styles.description}>
              <table>
                <tr>
                  <td>Data calculator by Freek.</td>
                  <td>Front-end by Julian.</td>
                </tr>
                <tr>
                  <td>Styling by Alex.</td>
                  <td>Documentation by Frank.</td>
                </tr>
              </table>
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} target="_BLANK" rel="noopener noreferrer" href="https://webmodel.readthedocs.io/">
                  Documentation
                </a>
              </li>
              {/* <li>
                <a className={styles.footerlink} href="/">
                  Example Link
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="/">
                  Example Link
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
