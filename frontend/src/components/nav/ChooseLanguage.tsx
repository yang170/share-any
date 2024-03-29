import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";

const ChooseLanguage = React.memo((): JSX.Element => {
  const { t, i18n } = useTranslation("nav");

  const handleChangeLanguage = (changeTo: string) => () => {
    i18n.changeLanguage(changeTo);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        minWidth="-webkit-fit-content"
      >
        {t("language")}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleChangeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={handleChangeLanguage("zh")}>简体中文</MenuItem>
      </MenuList>
    </Menu>
  );
});

export { ChooseLanguage };
