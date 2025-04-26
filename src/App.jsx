import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContextProvider from "./Context/MainContext/Maincontext";
import { Suspense, lazy, useContext } from "react";
import Spinner from "./Components/General/Spinner";


// Lazy-loaded components
const GetTasks = lazy(() => import("./Components/TodoPages/AllTasks/GetTasks"));
const GetBM = lazy(() => import("./Components/Bookmarks/Common-Components/GetBM.jsx"));
const SocialBM = lazy(() => import("./Components/Bookmarks/BM-Pages/SocialsBM"));
const CodingBM = lazy(() => import("./Components/Bookmarks/BM-Pages/CodingBM"));
const ToolsBM = lazy(() => import("./Components/Bookmarks/BM-Pages/ToolsBM"));

const TodayTasklist = lazy(() =>
  import("./Components/TodoPages/Tasks/TodayTasklist")
);
const MissingTasklist = lazy(() =>
  import("./Components/TodoPages/Tasks/Missingtask")
);
const ImpTasklist = lazy(() =>
  import("./Components/TodoPages/Tasks/ImportantTasks")
);
const Watch = lazy(() => import("./Components/DigitalWatch/Watch"));
const Reminder = lazy(() => import("./Components/Reminders/Remider"));
const Settings = lazy(() => import("./Components/Settings/Settings"));

// Eagerly loaded
import AppContainer from "./Components/Pages/AppContainer/AppContainer";
import DashBoard from "./Components/Pages/DashBoard/Dashboard";


function App() {

  return (
    <Router>
      <MainContextProvider>
        <Suspense fallback={<Spinner />}>
          {/* <SmoothScrolling/> */}
          <Routes>
            {/* Home route with nested routes */}
            <Route

              element={

                <AppContainer />

              }
            >
              {/* Protected routes */}
              <Route index element={<DashBoard />} /> {/* Eagerly loaded */}
              <Route path="tasks" element={<GetTasks />}>
                <Route path="today" element={<TodayTasklist />} />
                <Route path="important" element={<ImpTasklist />} />
                <Route path="missing" element={<MissingTasklist />} />
              </Route>
              <Route path="bookmarks" element={<GetBM />}>
                <Route path="Codingbm" element={<CodingBM />} />
                <Route path="socialbm" element={<SocialBM />} />
                <Route path="toolsbm" element={<ToolsBM />} />
              </Route>

              <Route path="reminder" element={<Reminder />} />
              <Route path="watch" element={<Watch />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </MainContextProvider>
    </Router>
  );
}

export default App;


