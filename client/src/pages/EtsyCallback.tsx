import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Spinner from "../components/Spinner";

import * as EtsyApi from "../network/etsy_api";

const EtsyCallback = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    async function getAccessToken(code: string) {
      try {
        const accessToken = await EtsyApi.getAccessToken(code);
        console.log("CLIENT: ", accessToken);
      } catch (error) {
        console.log("CLIENT: ", error);
      }
    }

    const code = params.get("code");
    if (code) {
      getAccessToken(code);
    }
  }, [params]);

  return (
    <div className="mt-16">
      <Spinner />
    </div>
  );
};

export default EtsyCallback;
