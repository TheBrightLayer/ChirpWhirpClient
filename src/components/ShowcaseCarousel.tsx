import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/ShowcaseCarousel.css"; // Import your styles

type Post = {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string; // This should be the slug, e.g., "my-first-blog"
};

interface ShowcaseCarouselProps {
  posts: Post[];
}

const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ posts }) => {
  // Pick random 7 posts
  const randomPosts = useMemo(() => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 7);
  }, [posts]);

  return (
    <div className="showcase-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      
        loop
        className="swiper-wrapper-custom"
      >
        {randomPosts.map((post, index) => (
          <SwiperSlide key={post.id}>
            <Link
              to={`/blogs/${post.slug}`} // Navigate to blog detail page
              className="showcase-slide-link"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              } // Scroll to top
            >
              <div
                className="showcase-slide"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="overlay"></div>

                <div className="content">
                  <span className="category">{post.category}</span>
                  <h2 className="title">{post.title}</h2>
                  <span className="read-more">Read More</span>
                </div>

                <div className="slide-number">
                  {String(index + 1).padStart(2, "0")} / {randomPosts.length}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShowcaseCarousel;
