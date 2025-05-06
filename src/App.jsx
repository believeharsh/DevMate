import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContextProvider from "./Context/MainContext/Maincontext";
import { Suspense } from "react";
import { Spinner, GetTasks, GetBM, SocialBM, CodingBM, ToolsBM, TodayTasklist, MissingTasklist, ImpTasklist, Watch, Reminder, Settings, AppContainer, DashBoard } from "./Components/index.js";

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


