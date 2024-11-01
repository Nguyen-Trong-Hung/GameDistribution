import React from 'react';
import { FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import './Footer.scss'; // Import file SCSS cho Footer

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <img src="/Logo_XGame-03.png" alt="" />
                    <p className="address">
                        <FaMapMarkerAlt />
                        <a
                            target="_blank"
                            className="address-link"
                            href="https://www.google.nl/maps/place/THE+NINE+TOWER/@21.0404436,105.7776896,17z/data=!3m1!4b1!4m6!3m5!1s0x313455a4ca6eaaa5:0xa14c50508ad467b4!8m2!3d21.0404436!4d105.7802645!16s%2Fg%2F11jt1x68f5?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
                        >
                             The Nine, No. 9 Pham Van Dong, Mai Dich, Cau Giay, Hanoi
                        </a>
                    </p>
                    <div className="social-media">
                        <span className="follow-us">Follow us</span>
                        <ul className="social-links">
                            <a href="https://www.linkedin.com/company/xgame-studio/">
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