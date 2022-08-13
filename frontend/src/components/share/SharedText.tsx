import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import {
  HStack,
  Flex,
  IconButton,
  Text,
  ScaleFade,
  useColorModeValue,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

interface ISharedText {
  session: string;
}

interface ISharedTextState {
  content: string;
}

const SharedText = React.memo(({ session }: ISharedText): JSX.Element => {
  const { t } = useTranslation("share");
  const backgroundColor = useColorModeValue("gray.100", "gray.600");
  const [sharedText, setSharedText] = React.useState<ISharedTextState>({
    content: "",
  });
  const { hasCopied, onCopy } = useClipboard(sharedText.content);

  React.useEffect(() => {
    const interval = setInterval(() => pullSharedText({ session }), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [session]);

  const pullSharedText = async ({ session }: ISharedText) => {
    await axios.get(`text/${session}`).then((res) => {
      setSharedText({ content: res.data["content"] });
    });
  };

  const handleCopy = () => {
    onCopy();
  };

  return (
    <Flex
      borderRadius="md"
      direction="column"
      width="full"
      height="52"
      marginBottom="10"
      backgroundColor={backgroundColor}
      overflowY="auto"
    >
      <HStack margin="3">
        <Text as="span" fontWeight="bold">
          {t("sharedTextAreaTitle")}
        </Text>
        <IconButton
          aria-label="Copy"
          colorScheme="blue"
          onClick={handleCopy}
          variant="ghost"
          icon={<CopyIcon />}
        />
        {hasCopied ? (
          <ScaleFade initialScale={0.9} in={hasCopied}>
            <Text>{t("textCopied")}</Text>
          </ScaleFade>
        ) : null}
      </HStack>
      <Text marginLeft="3">{sharedText.content}</Text>
    </Flex>
  );
});

export { SharedText };
