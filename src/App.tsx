import { Suspense } from "react";
import { router as Router } from "./components/Router";
import { RouterProvider } from "@tanstack/react-router";

function App() {
  return (
    <Suspense fallback={<div />}>
      <RouterProvider router={Router} />
    </Suspense>
  );
}

export default App;
