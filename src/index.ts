import dotenv from 'dotenv';

import { formatWishLink65Message } from './format';
import logger from './log';
import { getWishProducts } from './product';
import { sendMessageToMe } from './report';

function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Unexpected nullable');
  }
}

dotenv.config();

const run = async () => {
  const wishProducts = await getWishProducts();
  logger.info(wishProducts);

  if (wishProducts.length) {
    const message = formatWishLink65Message(wishProducts);
    await sendMessageToMe(message);
  }
};

if (typeof require !== 'undefined' && require.main === module) {
  // run().finally(() => process.exit(0));
  sendMessageToMe('asdf');
}
