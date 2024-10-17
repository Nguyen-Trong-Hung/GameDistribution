import React from 'react';
import { FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import './Footer.scss'; // Import file SCSS cho Footer

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <img src="/gamedistribution.png" alt="" />
                    <p className="address">
                        <FaMapMarkerAlt />
                        <a
                            target="_blank"
                            className="address-link"
                            href="https://www.google.nl/maps/place/Azerion/@52.2779692,4.750998,17z/data=!3m1!4b1!4m6!3m5!1s0x47c60c686089387b:0x58146d40b5c1a299!8m2!3d52.2779692!4d4.750998!16s%2Fg%2F11cllgmc8y?entry=ttu"
                        >
                            Boeing Avenue 30, 1119 PE Schiphol-Rijk, The Netherlands
                        </a>
                    </p>
                    <div className="social-media">
                        <span className="follow-us">Follow us</span>
                        <ul className="social-links">
                            <a href="https://www.linkedin.com/company/gamedistribution/?viewAsMember=true">
                                <FaLinkedin />
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="footer-policy">
                    <p>Azerion Copyright 2017 - 2023 |
                        <a
                            target="_blank"
                            className="footer-link"
                            rel="nofollow"
                            href="https://static.gamedistribution.com/policy/privacy.html"
                        >
                            Privacy policy
                        </a>
                        &nbsp;-&nbsp;
                        <a
                            target="_blank"
                            className="footer-link"
                            rel="nofollow"
                            href="https://static.gamedistribution.com/policy/privacy-platform.html"
                        >
                            Platform Privacy policy
                        </a>
                        &nbsp;-&nbsp;
                        <a
                            target="_blank"
                            className="footer-link"
                            rel="noopener noreferrer"
                            href="https://static.gamedistribution.com/terms/both.html"
                        >
                            Terms &amp; conditions
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;