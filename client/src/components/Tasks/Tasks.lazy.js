import React, { lazy, Suspense } from 'react';

const LazyTasks = lazy(() => import('./Tasks'));

const Tasks = props => (
  <Suspense fallback={null}>
    <LazyTasks {...props} />
  </Suspense>
);

export default Tasks;
