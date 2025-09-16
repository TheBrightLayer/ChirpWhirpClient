import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import ServicesPage from "./pages/ServicesPage";
import { Hero } from "./components/Hero";
import { VideoShowcase } from "./components/VideoShowCase";
import { Services } from "./components/Services";
import CreateBlog from "./pages/CreateBlog";
import Footer from "./components/Footer";
import ServiceStack from "./components/ServiceStack";
import LoginForm from "./components/LoginForm";
import "./components/App.css";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import CategoryPage from "./pages/CategoryPage";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/blogs";

  // Decide when to hide header/footer
  const hideLayout =
    location.pathname.startsWith("/blogs") ||
    location.pathname.startsWith("/category");

  return (
    <>
      {!hideLayout && <Header />}

      {isHome && !hideLayout && (
        <>
          <Hero />
          <VideoShowcase />
          <Services />
          <ServiceStack />
        </>
      )}

      <Routes>
        {/* Blog and category routes */}
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        {/* All other pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
