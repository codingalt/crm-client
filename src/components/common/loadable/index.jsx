import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HintLoading from "../loaders/HintLoading";
import { Button } from "@/components/ui/button";

// Transition wrapper for smooth component transitions
const TransitionWrapper = ({ children, isLoading, fixed }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          <HintLoading fixed={fixed} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12, ease: "easeInOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Professional Loadable HOC - only shows loader for actual lazy loading
const Loadable = (Component, fixed = false) => {
  const LoadableComponent = React.forwardRef((props, ref) => {
    return (
      <Suspense
        fallback={
          <TransitionWrapper isLoading={true} fixed={fixed}>
            <div /> {/* Empty div, loader is in TransitionWrapper */}
          </TransitionWrapper>
        }
      >
        <ErrorBoundary>
          <TransitionWrapper isLoading={false} fixed={fixed}>
            <Component {...props} ref={ref} />
          </TransitionWrapper>
        </ErrorBoundary>
      </Suspense>
    );
  });

  // Set display name for debugging
  LoadableComponent.displayName = `Loadable(${
    Component.displayName || Component.name || "Component"
  })`;

  return LoadableComponent;
};

// Enhanced Error Boundary with better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component loading error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center min-h-[200px] p-6"
        >
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">
              Something went wrong loading this page
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm"
            >
              Reload Page
            </Button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default Loadable;
