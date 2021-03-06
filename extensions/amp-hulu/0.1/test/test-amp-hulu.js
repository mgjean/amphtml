/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  createIframePromise,
  doNotLoadExternalResourcesInTest,
} from '../../../../testing/iframe';
import '../amp-hulu';
import {adopt} from '../../../../src/runtime';

adopt(window);

describe('amp-hulu', () => {

  function getHulu(eid, opt_responsive) {
    return createIframePromise(/*opt_runtimeOff*/ true).then(iframe => {
      doNotLoadExternalResourcesInTest(iframe.win);
      const hulu = iframe.doc.createElement('amp-hulu');
      hulu.setAttribute('data-eid', eid);
      hulu.setAttribute('width', '111');
      hulu.setAttribute('height', '222');
      if (opt_responsive) {
        hulu.setAttribute('layout', 'responsive');
      }
      return iframe.addElement(hulu);
    });
  }

  it('renders', () => {
    return getHulu('4Dk5F2PYTtrgciuvloH3UA').then(hulu => {
      const iframe = hulu.querySelector('iframe');
      expect(iframe).to.not.be.null;
      expect(iframe.tagName).to.equal('IFRAME');
      expect(iframe.src)
          .to.equal('https://player.hulu.com/site/dash/mobile_embed.html?amp=1&eid=4Dk5F2PYTtrgciuvloH3UA');
    });
  });

  it('renders responsively', () => {
    return getHulu('4Dk5F2PYTtrgciuvloH3UA', true).then(hulu => {
      const iframe = hulu.querySelector('iframe');
      expect(iframe).to.not.be.null;
      expect(iframe.className).to.match(/i-amphtml-fill-content/);
    });
  });

  it('requires data-eid', () => {
    return getHulu('').should.eventually.be.rejectedWith(
        /The data-eid attribute is required for/);
  });
});
