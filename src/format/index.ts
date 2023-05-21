export const formatWishLink65Message = (wishProducts: string[]) =>
  `Link65의 아래와 같은 옵션이 재입고 상태입니다.\n\n${wishProducts.join(
    '\n',
  )}`;
