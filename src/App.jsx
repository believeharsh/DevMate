import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContextProvider from "./Context/MainContext/Maincontext";
import { Suspense } from "react";
import { Spinner, GetTasks, GetBM, SocialBM, CodingBM, ToolsBM, TodayTasklist, MissingTasklist, ImpTasklist, Watch, Reminder, Settings, AppContainer, DashBoard, Login, Signup, Logout} from "./Components/index.js";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/Auth/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {

  return (
    <Router>
      <MainContextProvider>
        <Suspense fallback={<Spinner />}>
          {/* <SmoothScrolling/> */}
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppContainer />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashBoard />} />
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

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

        </Suspense>
      </MainContextProvider>
    </Router>
  );
}

export default App;


