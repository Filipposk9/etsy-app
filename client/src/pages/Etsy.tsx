import { useCallback, useEffect, useState } from "react";

import Spinner from "../components/Spinner";

import { EtsyCredentials as EtsyCredentialsModel } from "../models/etsyCredentials";
import * as EtsyApi from "../network/etsy_api";

const Etsy = () => {
  const [credentials, setCredentials] = useState<EtsyCredentialsModel>();
  useEffect(() => {
    async function fetchCredentials() {
      try {
        const credentials = await EtsyApi.getEtsyCredentials();
        setCredentials(credentials);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCredentials();
  }, []);

  const handleRefreshButtonClick = useCallback(() => {
    async function setCredentials() {
      try {
        await EtsyApi.setEtsyCredentials();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    setCredentials();
  }, []);

  if (!credentials) {
    return (
      <div className="mt-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-16">
      <a
        href={`https://www.etsy.com/oauth/connect?
          response_type=code
          &redirect_uri=${process.env.REACT_APP_AUTH_CALLBACK}
          &scope=transactions_r%20transactions_w%20profile_r
          &client_id=${process.env.REACT_APP_ETSY_API_KEY}&state=${credentials.state}
          &code_challenge=${credentials.codeChallenge}
          &code_challenge_method=S256`}
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Login to Etsy
      </a>

      <button
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRefreshButtonClick}
      >
        Refresh tokens
      </button>

      <button
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRefreshButtonClick}
      >
        Get data
      </button>
    </div>
  );
};

export default Etsy;
