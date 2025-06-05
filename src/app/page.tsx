import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { queryClient } from 'shared/lib';

const HomePage = () => {
  return (
    <main className="p-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>Hello World</h1>
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
