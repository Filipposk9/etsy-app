import { useCallback, useEffect, useState } from "react";

import Orders from "../components/Orders";

import Spinner from "../components/Spinner";

import { EtsyCredentials as EtsyCredentialsModel } from "../models/etsyCredentials";
import { EtsyToken as EtsyTokenModel } from "../models/etsyToken";
import * as EtsyApi from "../network/etsy_api";

const Etsy = (): JSX.Element | null => {
  const [credentials, setCredentials] = useState<EtsyCredentialsModel>();
  const [token, setToken] = useState<EtsyTokenModel>();
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await EtsyApi.getAccessToken();
        setToken(token);
      } catch (error) {
        console.log(error);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const orders = await EtsyApi.getData();
        setOrders(orders);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleGetDataClick = useCallback(() => {
    async function getData() {
      try {
        setOrders([]);
        const orders = await EtsyApi.getData();
        setOrders(orders);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getData();
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

  if (!credentials || !token || !orders.length) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] mt-16">
        <Spinner />
      </div>
    );
  }

  if (credentials && !token) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] mt-16">
        <a
          href={`https://www.etsy.com/oauth/connect?
                  response_type=code
                  &redirect_uri=${process.env.REACT_APP_AUTH_CALLBACK}
                  &scope=transactions_r%20transactions_w%20profile_r
                  &client_id=${process.env.REACT_APP_ETSY_API_KEY}&state=${credentials.state}
                  &code_challenge=${credentials.codeChallenge}
                  &code_challenge_method=S256`}
          className="w-30 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mx-1 rounded"
        >
          Login to Etsy
        </a>

        <button
          className="w-30 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mx-1 rounded"
          onClick={handleRefreshButtonClick}
        >
          Refresh tokens
        </button>
      </div>
    );
  }

  if (token.access_token) {
    return (
      <div className="mt-16">
        <Orders
          orders={orders}
          onHandleRefreshButtonClick={handleGetDataClick}
        />
      </div>
    );
  }

  return null;
};

export default Etsy;
