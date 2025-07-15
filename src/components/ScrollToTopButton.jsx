import React, { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) setVisible(true);
    else setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    visible && (
      <div className="fp__scroll_btn" onClick={scrollToTop}>
        Go to Top
      </div>
    )
  );
}
