/**
 * delayTime만큼 동작을 지연시킵니다.
 *
 * @param delayTime delay시킬 시간(ms)
 */
export const delay = async (delayTime: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayTime);
  });
};

/**
 * delayTime만큼 동작을 지연시킨 뒤 전달받은 fn을 실행합니다.
 * @param delayTime delay시킬 시간(ms)
 * @param fn delayTime이후 실행할 함수
 */
export const delayFn = async (delayTime: number, fn: () => void) => {
  await delay(delayTime);
  fn();
};
