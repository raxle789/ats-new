import Link from 'next/link';
import React from 'react';

export function WidgetOne({
  cls,
  style_2,
}: {
  cls: string;
  style_2?: boolean;
}) {
  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2 ? 'text-white' : ''}`}>
        About Us​
      </h5>
      <ul className="footer-nav-link style-none">
        <li>
          <Link href="/job-grid-v2">Company Profile</Link>
        </li>
        <li>
          <Link href="/company-v1">Vision & Mission</Link>
        </li>
        <li>
          <Link href="/candidates-v1">Awards</Link>
        </li>
        <li>
          <Link href="/pricing">Milestones</Link>
        </li>
        <li>
          <Link href="/pricing">Management Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export function WidgetTwo({
  cls,
  style_2,
}: {
  cls: string;
  style_2?: boolean;
}) {
  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2 ? 'text-white' : ''}`}>
        Social and Events
      </h5>
      <ul className="footer-nav-link style-none">
        <li>
          <Link href="/about-us">Newsroom</Link>
        </li>
        <li>
          <Link href="/blog-v2">Social Responsibilities</Link>
        </li>
        <li>
          <Link href="/faq">CSR Events</Link>
        </li>
        {/* <li><Link href='/contact'>Contact</Link></li> */}
      </ul>
    </div>
  );
}

export function WidgetThree({
  cls,
  style_2,
}: {
  cls: string;
  style_2?: boolean;
}) {
  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2 ? 'text-white' : ''}`}>Support</h5>
      <ul className="footer-nav-link style-none">
        <li>
          <Link href="/contact">Terms of use</Link>
        </li>
        <li>
          <Link href="/contact">Terms & conditions</Link>
        </li>
        <li>
          <Link href="/contact">Privacy</Link>
        </li>
        <li>
          <Link href="/contact">Cookie policy</Link>
        </li>
      </ul>
    </div>
  );
}
