---
layout: doc
permalink: /docs/3rd-party/client-settings
---

# Using extension instance settings in the app

On our UI screen, we only used mocked products as response. Since we have `ACCESS TOKEN` now in extension instance settings, we can get the real products from Shopify. If you haven't, fill out your Shopify store with some data. That means that we need to create reducer for `products` which we'll use from our state. Create `app/reducers/index.js` file which will expose the state representation for the extension. Fill that file with content:

```
import { combineReducers } from 'redux';
import products from './products';

export default combineReducers({
  products
});
```

Function [combineReducers](http://redux.js.org/docs/api/combineReducers.html) from react allows us to split our reducers in more files, each dedicated for part of state. Now create `app/reducers/products.js` file which will hold implementation for reducer for `products`. When implementing stores for extensions in application, we're using [redux thunk](TODO) which allows dispatch a function, rather than only some object. This is crucial, because like that, we'll fetch new products from Shoutem.

Let's now implement `reducers/products.js` reducer:

```
import * as ACTIONS from '../actions';

export default (products = {}, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_PRODUCTS: 
      const newProducts = action.products;
      return newProducts;
    default:
      return products;
  }
}
```

Now we need to create `FETCH_PRODUCTS` function and action which will actually fetch products which we'll dispatch from our screen component. Create `app/actions/index.js` with those constructs:

```
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(shop, accessToken) => (dispatch, getState) => {
  // fetch data
}
```

Inside of `fetchProducts` method we need to retrieve products from Shopify's shop and to dispatch FETCH_PRODUCTS action. Actual fetching we'll do with already used `request` package.

Install package inside of app folder. Locate with terminal inside of the `app/` folder and do:

```
npm install -S request
```

Let's implement now fetching the products in `app/actions/index.js`. We'll only request fields which are needed for products.

<pre>
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

function createFetchProductsAction(products) {
  return {
    type: FETCH_PRODUCTS,
    products
  }
}

export function fetchProducts(shop, accessToken) => (dispatch, getState) => {
  // Fetch data
<span class="newCode">  const productsUrl = 'https://' + shop + '.myshopify.com/admin/products.json?fields=title,images,variants';
  const headers = { 'X-Shopify-Access-Token': accessToken }
  request.get({url: productsUrl, headers: headers}, function(err, httpResponse, body) {
    // Check if there's an error here

    dispatch(createFetchProductsAction(body.products));
  })</span>  
}
</pre>

Now that we have everything ready, let's use extension instance `settings` on `app/screens/ProductsList.js` screen. In `connect` function at export section, take only `products` from the state:

```
export default connect((state, ownProps) => { products: state[EXT].products })(ProductsList)
```

When component is mounted, we need to dispatch a function if products are an empty object. Import fetchProducts action and `lodash` library which we'll need to check if products are empty

```
import _ from 'lodash';
import fetchProducts from '../actions';
```

To fetch products, we need settings that are set on shortcut. Every action bounded to shortcut gets `shortcut` object. Check [Shortcut reference](TODO) to see what this shortcut includes. One of the properties that it has, are `settings`, which are the object that we need on our screen. Let's pass these settings to our screen in `app/shortcuts/OpenProductsList.js`:

<pre>
<span class="newCode">export default function (shortcut) {</span>
  return navigateTo({
<span class="newCode">    screen: 'dev-name.shopify-extension.ProductsList',
    props: {
      settings: shortcut.settings,
    },</span>
  })
}
</pre>

Back to ProdutsList. Add `componentDidMount` method and get settings from props:

```
componentDidMount() {
  const { dispatch, products, settings } = this.props;
  if (_.isEmpty(products)) {
    dispatch(fetchProducts(settings.get('shop'), settings.get('accessToken')));
  }
}
```

Now we need to change the render method. If there are no products, show spinner screen. When `fetchProducts` method is called, products will be fetched from Shopify and screen will automatically be re-rendered.

```
render() {
  const { products } = this.props;
  return _.isEmpty(products) ? (
    <View>
      <NavigationBar />
      <ListView
        dataSource={this.getDataSource(products)}
        renderRow={product => this.renderRow(product)}
      />
    </View> :
    <SpinnerScreen />
  )
}
```

We're done with screen! Now it's safe to delete `getProducts()` method from the screen methods. This is what you should have ended with:

<pre>
import React, {
  StyleSheet,
  Component,
  ListView,
} from 'react-native';
import _ from 'lodash';
import { SpinnerScreen, NavigationBar } from 'shoutem-ui/views';

import ProductRow from '../components/ProductRow';
import fetchProducts from '../actions';

class ProductsList extends Component {
  getDataSource(products) {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return dataSource.cloneWithRows(products);
  }

  renderRow(product) {
    return (
      <ProductRow product/>
    )
  }

<span class="newCode">  componentDidMount() {
    const { dispatch, products, settings } = this.props;
    if (_.isEmpty(products)) {
      dispatch(fetchProducts(settings.get('shop'), settings.get('accessToken')));
    }
  }</span>

  render() {
<span class="newCode">    const { products } = this.props;
    return _.isEmpty(products) ? (
      &lt;View>
        &lt;NavigationBar />
        &lt;ListView
          dataSource={this.getDataSource(products)}
          renderRow={product => this.renderRow(product)}
        />
      &lt;/View> :
      &lt;SpinnerScreen /></span>
    )
  }
}

<span class="newCode">export default connect((state, ownProps) => { products: state[EXT].products })(ProductsList)</span>
</pre>

TODO - write the complete code what should be the result.

Upload it:
```
shoutem upload
```

You can see only title on the products, without any image. 

TODO - add picture with good products, but with broken, placeholdered image

That's because we didn't update `ProductsRow` component after we added functionality of fetching the products from Shopify. See in the [Shopify](TODO) docs how the fields for products look like. Update now `app/components/ProductsRow.js` component so it uses correct properties:

<pre>
render() {
  let { product, onProductPress } = this.props;

  return (
    &lt;View>
      &lt;Image
        source:{{uri: getAsset(product.images[0].src)}}
      />
      &lt;Text>{product.title}&lt;/Text>
      &lt;Text>{product.variants.price} $&lt;/Text>
    &lt;/View>
  )
}
</pre>

Do:
```
shoutem upload
```

Everything works as expected!

TODO - add good picture (that is the same as mockup)

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/3rd-party/shoutem-sdk"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/3rd-party/summary">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>
