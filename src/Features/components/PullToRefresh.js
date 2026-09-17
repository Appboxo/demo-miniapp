import React, { useState, useEffect } from "react";
import appboxoSdk from "@appboxo/js-sdk";
import { SecondaryButton } from "@appboxo/ui-kit";
import FeatureCard, { StatusLine } from "../../components/FeatureCard";

const PullToRefresh = () => {
  const [refreshStatus, setRefreshStatus] = useState("idle");
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  const pullToRefreshListener = (event) => {
    if (!event.detail) {
      return;
    }

    const { type } = event.detail;

    if (type === "AppBoxoWebAppStartPullToRefresh") {
      setRefreshStatus("refreshing");

      setTimeout(() => {
        setRefreshStatus("completed");
        setLastRefreshTime(new Date().toLocaleTimeString());
        appboxoSdk.send("AppBoxoWebAppStopPullToRefresh");
      }, 1500);
    }
  };

  useEffect(() => {
    appboxoSdk.subscribe(pullToRefreshListener);

    return () => {
      appboxoSdk.unsubscribe(pullToRefreshListener);
    };
  }, []);

  const enablePullToRefresh = () => {
    appboxoSdk.send("AppBoxoWebAppSetPullToRefresh", {
      enabled: true,
    });
    setRefreshStatus("enabled");
  };

  const disablePullToRefresh = () => {
    appboxoSdk.send("AppBoxoWebAppSetPullToRefresh", {
      enabled: false,
    });
    setRefreshStatus("disabled");
  };

  return (
    <FeatureCard title="Pull To Refresh">
      <SecondaryButton text="Enable Pull To Refresh" onClick={enablePullToRefresh} />
      <SecondaryButton text="Disable Pull To Refresh" onClick={disablePullToRefresh} />
      <StatusLine label="Status:" value={refreshStatus} />
      {lastRefreshTime && (
        <StatusLine label="Last refreshed at:" value={lastRefreshTime} />
      )}
    </FeatureCard>
  );
};

export default PullToRefresh;
