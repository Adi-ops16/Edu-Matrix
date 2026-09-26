"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

const ThemeToggleButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return <Spinner className="w-4 h-4" />;
  }

  const handleThemeChange = (themeStatus: string) => {
    localStorage.setItem("theme", themeStatus);
    setTheme(themeStatus);
  };

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => handleThemeChange(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute"
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Moon className="h-5 w-5 text-foreground" />
      </motion.div>

      <motion.div
        className="absolute"
        animate={{
          rotate: isDark ? -180 : 0,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Sun className="h-5 w-5 text-foreground" />
      </motion.div>
    </button>
  );
};

export default ThemeToggleButton;
