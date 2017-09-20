import assert from 'assert';

import * as checkoutLib from 'routes/checkout/lib';
import logger from 'tools/logger';

logger.testEnv();

describe('Checkout-Route Library', () => {
  describe('#Test retrieveInfoFromSession', () => {
    it('Valid req with all keys', async () => {
      const req = {
        user: {
          id: 123456,
        },
        isAuthenticated: () => true,
        session: {
          cart: {
            id: 654321,
          },
        },
      };
      const res = {};
      assert.deepEqual({
        login: true,
        userId: 123456,
        cartId: 654321,
      }, await checkoutLib.retrieveInfoFromSession(req, res));
    });

    it('Valid req without cart', async () => {
      const req = {
        user: {
          id: 123456,
        },
        isAuthenticated: () => true,
        session: {
        },
      };
      const res = {};
      assert.deepEqual({
        login: true,
        userId: 123456,
        cartId: undefined,
      }, await checkoutLib.retrieveInfoFromSession(req, res));
    });

    it('Invalid req without session', async () => {
      const req = {};
      const res = {};
      assert.deepEqual({
        error: 'No session Associated',
      }, await checkoutLib.retrieveInfoFromSession(req, res));
    });
  });
});

