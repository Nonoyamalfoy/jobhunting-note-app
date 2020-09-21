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

export const createNumberChangeEventCallback = (update: Dispatch<SetStateAction<number>>) => {
  return useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // if (/^[0-9]+$/.test(event.target.value)) {
      // event.target.valueは文字列型なので、数値型に変換する
      update(Number(event))
    // }
  }, [update])
}
// export const createNumberChangeEventCallback = (update: Dispatch<SetStateAction<number>>) => {
//   return useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     if (/^[0-9]+$/.test(event.target.value)) {
//       // event.target.valueは文字列型なので、数値型に変換する
//       update(Number(event.target.value))
//     }
//   }, [update])
// }