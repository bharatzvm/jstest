import assert from 'assert';
import fse from 'fs-extra';

import config from 'config';


describe('Logging Module', () => {
  describe('#Check Log path Existence and accessibility', () => {
    it('File path should Exist', () => {
      fse.ensureDir(config.LOG_ROOT).then(() => {
        assert.ok(true);
      }).catch((err) => {
        assert.fail(err);
      });
    });
  });
});
