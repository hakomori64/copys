'use strict';

define("super-rentals/tests/acceptance/super-rentals-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | super rentals', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('Welcome to Super Rentals!');
      assert.dom('.jumbo a.button').hasText('About Us');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
    });
    (0, _qunit.test)('visiting /about', async function (assert) {
      await (0, _testHelpers.visit)('/about');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('About Super Rentals');
      assert.dom('.jumbo a.button').hasText('Contact Us');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/getting-in-touch');
    });
    (0, _qunit.test)('visiting /getting-in-touch', async function (assert) {
      await (0, _testHelpers.visit)('/getting-in-touch');
      assert.equal((0, _testHelpers.currentURL)(), '/getting-in-touch');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('Contact Us');
      assert.dom('.jumbo a.button').hasText('About');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
    });
    (0, _qunit.test)('navigating using the nav-bar', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.dom('nav').exists();
      assert.dom('nav a.menu-index').hasText('SuperRentals');
      assert.dom('nav a.menu-about').hasText('About');
      assert.dom('nav a.menu-contact').hasText('Contact');
      await (0, _testHelpers.click)('nav a.menu-about');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
      await (0, _testHelpers.click)('nav a.menu-contact');
      assert.equal((0, _testHelpers.currentURL)(), '/contact');
      await (0, _testHelpers.click)('nav a.menu-index');
      assert.equal((0, _testHelpers.currentURL)(), '/');
    });
  });
});
define("super-rentals/tests/integration/components/jumbo-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | jumbo', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders the content inside a jumbo header with a tomster', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Jumbo>Hello World</Jumbo>
      */
      {
        "id": "I+q5iC61",
        "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"Hello World\"]],[]]]]]],[],false,[\"jumbo\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.jumbo').exists();
      assert.dom('.jumbo').hasText('Hello World');
      assert.dom('.jumbo .tomster').exists();
    });
  });
});
define("super-rentals/tests/integration/components/map-test", ["qunit", "ember-qunit", "@ember/test-helpers", "super-rentals/config/environment"], function (_qunit, _emberQunit, _testHelpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | map', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders a map image for the specified parameters', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
          />
      */
      {
        "id": "IdNm1oWT",
        "block": "[[[8,[39,0],null,[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.map img').exists().hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184').hasAttribute('src').hasAttribute('width', '150').hasAttribute('height', '120');
      let {
        src
      } = (0, _testHelpers.find)('.map img');
      let token = encodeURIComponent(_environment.default.MAPBOX_ACCESS_TOKEN);
      assert.ok(src.startsWith('https://api.mapbox.com/'), 'the src starts with "https://api.mapbox.com/"');
      assert.ok(src.includes('-122.4184,37.7797,10'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(src.includes('150x120@2x'), 'the src should include the width,height and @2x parameter');
      assert.ok(src.includes(`access_token=${token}`), 'the src should include the escaped access token');
    });
    (0, _qunit.test)('it updates the `src` attribute when the arguments change', async function (assert) {
      this.setProperties({
        lat: 37.7749,
        lng: -122.4194,
        zoom: 10,
        width: 150,
        height: 120
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
            @lat={{this.lat}}
            @lng={{this.lng}}
            @zoom={{this.zoom}}
            @width={{this.width}}
            @height={{this.height}}
          />
      */
      {
        "id": "Em6bIFrN",
        "block": "[[[8,[39,0],null,[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[[30,0,[\"lat\"]],[30,0,[\"lng\"]],[30,0,[\"zoom\"]],[30,0,[\"width\"]],[30,0,[\"height\"]]]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      let img = (0, _testHelpers.find)('.map img');
      assert.ok(img.src.includes('-122.4194,37.7749,10'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(img.src.includes('150x120@2x'), 'the src should include the width,height and @2x parameter');
      this.setProperties({
        width: 300,
        height: 200,
        zoom: 12
      });
      assert.ok(img.src.includes('-122.4194,37.7749,12'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(img.src.includes('300x200@2x'), 'the src should include the width,height and @2x parameter');
      this.setProperties({
        lat: 47.6062,
        lng: -122.3321
      });
      assert.ok(img.src.includes('-122.3321,47.6062,12'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(img.src.includes('300x200@2x'), 'the src should include the width,height and @2x parameter');
    });
    (0, _qunit.test)('the default alt attribute can be overridden', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
            alt="A map of San Francisco"
          />
      */
      {
        "id": "KTAr5rIA",
        "block": "[[[8,[39,0],[[24,\"alt\",\"A map of San Francisco\"]],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
    });
    (0, _qunit.test)('the src, width and height attributes cannot be overridden', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
            src="/assets/images/teaching-tomster.png"
            width="200"
            height="300"
          />
      */
      {
        "id": "gHiVpqW5",
        "block": "[[[8,[39,0],[[24,\"src\",\"/assets/images/teaching-tomster.png\"],[24,\"width\",\"200\"],[24,\"height\",\"300\"]],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.map img').hasAttribute('src', /^https:\/\/api\.mapbox\.com\//).hasAttribute('width', '150').hasAttribute('height', '120');
    });
  });
});
define("super-rentals/tests/integration/components/rental-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders information about a rental history', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.setProperties({
        rental: {
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rental @rental={{this.rental}} />
      */
      {
        "id": "BECEasIg",
        "block": "[[[8,[39,0],null,[[\"@rental\"],[[30,0,[\"rental\"]]]],null]],[],false,[\"rental\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('article').hasClass('rental');
      assert.dom('article h3').hasText('Grand Old Mansion');
      assert.dom('article .detail.owner').includesText('Veruca Salt');
      assert.dom('article .detail.type').includesText('Standalone');
      assert.dom('article .detail.location').includesText('San Francisco');
      assert.dom('article .detail.bedrooms').includesText('15');
      assert.dom('article .image').exists();
      assert.dom('article .map').exists();
    });
  });
});
define("super-rentals/tests/integration/components/rental/detailed-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental/detailed', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rental::Detailed />
      */
      {
        "id": "HC/crPlP",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"rental/detailed\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Rental::Detailed>
              template block text
            </Rental::Detailed>
          
      */
      {
        "id": "xB5p1jgq",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"rental/detailed\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/integration/components/rental/image-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental/image', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders the given image', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Rental::Image>
              template block text
            </Rental::Image>
            <Rental::Image
              src="/assets/images/teaching-tomster.png"
              alt="Teaching Tomster"
            />
          
      */
      {
        "id": "Yuqw47WY",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,\"src\",\"/assets/images/teaching-tomster.png\"],[24,\"alt\",\"Teaching Tomster\"]],null,null],[1,\"\\n    \"]],[],false,[\"rental/image\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
      assert.dom('.image img').exists().hasAttribute('src', '/assets/images/teaching-tomster.png').hasAttribute('alt', 'Teaching Tomster');
    });
    (0, _qunit.test)('clicking on the component toggles its size', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Rental::Image
              src="/assets/images/teaching-tomster.png"
              alt="Teaching Tomster"
            />
          
      */
      {
        "id": "VtiW+0j0",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"src\",\"/assets/images/teaching-tomster.png\"],[24,\"alt\",\"Teaching Tomster\"]],null,null],[1,\"\\n    \"]],[],false,[\"rental/image\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('button.image').exists();
      assert.dom('.image').doesNotHaveClass('large');
      assert.dom('.image small').hasText('View Larger');
      await (0, _testHelpers.click)('button.image');
      assert.dom('.image').hasClass('large');
      assert.dom('.image small').hasText('View Smaller');
      await (0, _testHelpers.click)('button.image');
      assert.dom('.image').doesNotHaveClass('large');
      assert.dom('.image small').hasText('View Larger');
    });
  });
});
define("super-rentals/tests/integration/components/rentals/filter-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rentals/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rentals::Filter />
      */
      {
        "id": "0BUeUBJ0",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"rentals/filter\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Rentals::Filter>
              template block text
            </Rentals::Filter>
          
      */
      {
        "id": "Qt599p0x",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"rentals/filter\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/integration/components/share-button-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | share-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton />
      */
      {
        "id": "0xQ1W8cO",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <ShareButton>
              template block text
            </ShareButton>
          
      */
      {
        "id": "N20MemSv",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/test-helper", ["super-rentals/app", "super-rentals/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define('super-rentals/config/environment', [], function() {
  var prefix = 'super-rentals';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
