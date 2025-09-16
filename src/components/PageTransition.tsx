import React from "react";
import { motion } from "framer-motion";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

const PageTransition: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
};

export default PageTransition;
