/**
 * Framer Motion Animation Variants
 * Centralized animation configurations for consistent UI animations
 */

// Page transition animations
export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

// Fade in animation
export const fadeInVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Slide up animation
export const slideUpVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Card hover animation
export const cardHoverVariants = {
    rest: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

// Stagger container for lists
export const staggerContainerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

// Stagger item for list items
export const staggerItemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// Modal/Dialog animations
export const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

// Modal backdrop animation
export const backdropVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};

// Button tap animation
export const buttonTapVariants = {
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.1,
            ease: "easeInOut"
        }
    }
};

// Scale in animation
export const scaleInVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// Rotate in animation
export const rotateInVariants = {
    hidden: {
        opacity: 0,
        rotate: -10,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Slide from left
export const slideFromLeftVariants = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Slide from right
export const slideFromRightVariants = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};
