import React from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "./ContentContainer";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const Favorites = () => {
  const [t] = useTranslation();
  return (
    <ContentContainer
      title={t("favorites")}
      icon={faStar}
    ></ContentContainer>
  );
};
