import { useLocation } from "react-router-dom";

const usePageMetadata = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/tasks")) {
    return { title: "Your Tasks" };
  }
  if (location.pathname.startsWith("/bookmarks")) {
    return { title: "Your BookMarks" };
  }

  switch (location.pathname) {
    case "/bookmarks":
      return { title: "Your Bookmarks" };
    case "/dashboard":
      return { title: "DevMate Dashboard" };
    case "/settings":
      return { title: "Settings" };
    default:
      return { title: "DevMate Dashboard" };
  }
};

export default usePageMetadata;