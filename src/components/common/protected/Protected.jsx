import React, { useState } from "react";
import HintLoading from "@/components/common/loaders/HintLoading";
import useAuthGuard from "@/hooks/useAuth";

const Protected = ({ Component }) => {
  const [show, setShow] = useState(null);

  useAuthGuard(setShow);

  if (show === null) {
    return <HintLoading />;
  }

  if (show === false) {
    // Auth failed and navigation already triggered
    return null;
  }

  // Auth successful
  return <Component />;
};

export default Protected;
