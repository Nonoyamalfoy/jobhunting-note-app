import React, { useCallback, SetStateAction, Dispatch } from "react";

export const createStringChangeEventCallback = (
  update: Dispatch<SetStateAction<string>>
) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      update(event.target.value);
    },
    [update]
  );
};
