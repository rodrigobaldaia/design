import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

export const toaster = {
  create: ({ description, type }) => {
    toast({
      description,
      status: type,
      duration: 2000,
      isClosable: true,
    });
  },
};