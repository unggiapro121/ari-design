import React, { useEffect, useState } from 'react';

import Card from '../../components/Card/Card';

import styles from './typography.module.scss';

interface fontStyleInterface {
  size: string;
  lineHeight: string;
}

const FontCard = ({ fontName, title }: { fontName: string; title: string }) => {
  const [fontStyle, setFontStyle] = useState<fontStyleInterface>();

  useEffect(() => {
    const divElement = document.getElementById(`${fontName}`);

    if (!divElement) return;

    const style = window.getComputedStyle(divElement);

    setFontStyle({ size: style.fontSize, lineHeight: style.lineHeight });
  }, []);

  return (
    <>
      <Card>
        <div id={`${fontName}`} className={fontName}>
          {title}
        </div>
        <div className={styles.typography__info}>
          size: {fontStyle?.size}, line-height: {fontStyle?.lineHeight}
        </div>
        <div className={styles.typography__handle}>
          style name: {fontName}
          <pre>@include font-style({fontName})</pre>
        </div>
      </Card>
    </>
  );
};

const Docs = () => {
  return (
    <>
      <h1>Typography</h1>
      <p>
        Base styles are provided out of the box with the ADS, including all
        headings.
      </p>
      <p>
        Use the following mixin styles as per the design specifications when
        overriding the default font sizes.
      </p>
      <p>Mobile font sizes are included in each mixin</p>
      <hr />
      <div style={{ display: 'flex' }}>
        <div className={styles.typography}>
          <h2>Headings</h2>
          <FontCard fontName={'h1'} title={'Heading 1'} />
          <FontCard fontName={'h2'} title={'Heading 2'} />
          <FontCard fontName={'h3'} title={'Heading 3'} />
          <FontCard fontName={'h4'} title={'Heading 4'} />
        </div>
        <div className={styles.typography}>
          <h2>Text</h2>
          <FontCard fontName={'base'} title={'Default'} />
          <FontCard fontName={'link'} title={'Links'} />
          <FontCard fontName={'nav'} title={'Navigation'} />
          <FontCard fontName={'small'} title={'Small/disclaimer'} />
          <FontCard fontName={'quote'} title={'Quote'} />
        </div>
        <div className={styles.typography}>
          <h2>Generic</h2>
          <FontCard fontName={'no1'} title={'No1'} />
          <FontCard fontName={'no2'} title={'No2'} />
          <FontCard fontName={'no3'} title={'No3'} />
        </div>
      </div>
    </>
  );
};

export default Docs;
