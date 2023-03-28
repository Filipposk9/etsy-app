import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";

import * as EtsyApi from "../network/etsy_api";

const EtsyCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccessToken(code: string) {
      try {
        await EtsyApi.setAccessToken(code);
        navigate("/etsy");
      } catch (error) {
        console.log("CLIENT: ", error);
      }
    }

    const code = params.get("code");
    if (code) {
      getAccessToken(code);
    }
  }, [navigate, params]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] mt-16">
      <Spinner />
    </div>
  );
};

export default EtsyCallback;
