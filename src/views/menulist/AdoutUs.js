import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

const AboutUs = () => {
  return (
    <PageContainer title="About Us" description="Learn more about Subi Asset">
      <div style={{ padding: '20px' }}>
        <h1>About <span style={{ color: '#e91e63', fontStyle: 'italic' }}>SubiAsset</span></h1>
        <p>
          <strong>Subi Asset</strong> is a next-generation platform that leverages
          <strong> blockchain security</strong> to ensure cybersecurity, data privacy, and encryption.
        </p>
        <p>
          Our mission is to <strong>enhance ownership security</strong> using Web3 technology, ensuring robust
          and transparent claims in ownership.
        </p>
        <h2>Why Subi Asset?</h2>
        <ul>
          <li>The shift toward decentralized systems requires secure ownership validation.</li>
          <li>Existing systems often fail to guarantee ownership integrity.</li>
          <li>Subi Asset leverages blockchain to establish immutable ownership records.</li>
          <li>We empower users with <strong>secure</strong> and <strong>transparent control</strong> over their digital assets.</li>
        </ul>
      </div>
    </PageContainer>
  );
};

export default AboutUs;
