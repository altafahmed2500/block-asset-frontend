import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import UserRecentTransactions from '../dashboard/components/UserRecentTransaction';

const Transactions = () => {
  return (
    <PageContainer title="Transaction page" description="All the transaction done by the user">
      <UserRecentTransactions />
    </PageContainer>
  );
};

export default Transactions;
