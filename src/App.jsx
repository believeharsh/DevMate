import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Spinner, GetTasks, GetBM, SocialBM, CodingBM, ToolsBM, TodayTasklist, MissingTasklist, ImpTasklist,  Settings, AppContainer, DashBoard, Login, Signup } from "./Components/index.js";
import { BookmarksProvider } from "./Context/BookMark-Context/BookMarkContext.jsx";
import TodoContextProvider from "./Context/Todo-Context/ToDoContext.jsx";
import AuthPromptModal from "./Components/General/AuthPromptModal.jsx"
import { useAuth } from "./Context/Auth/AuthContext.jsx";

function AppContent() {
  const { isAuthPromptOpen, closePrompt } = useAuth();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<AppContainer />}>
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
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>

      {/* Render modal */}
      <AuthPromptModal isOpen={isAuthPromptOpen} onClose={closePrompt} />
    </>
  );
}

function App() {
  return (
    <Router>
      <BookmarksProvider>
        <TodoContextProvider>

          <AppContent />

        </TodoContextProvider>
      </BookmarksProvider>
    </Router>
  );
}

export default App;
