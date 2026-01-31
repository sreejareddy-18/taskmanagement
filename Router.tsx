import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import TaskDetailPage from '@/components/pages/TaskDetailPage';
import TaskFormPage from '@/components/pages/TaskFormPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "tasks/new",
        element: <TaskFormPage />,
        routeMetadata: {
          pageIdentifier: 'new-task',
        },
      },
      {
        path: "tasks/:id",
        element: <TaskDetailPage />,
        routeMetadata: {
          pageIdentifier: 'task-detail',
        },
      },
      {
        path: "tasks/:id/edit",
        element: <TaskFormPage />,
        routeMetadata: {
          pageIdentifier: 'edit-task',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
