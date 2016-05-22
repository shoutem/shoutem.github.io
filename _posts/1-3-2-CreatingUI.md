---
layout: doc
permalink: /docs/3rd-party/creating-ui
---

# Creating extension's UI

Initialize extension:

```
shoutem init
```

<br />
Before connecting extension to Shopify application, make an UI skeleton for the extension. Start by adding shortcut which will open initial extension screen:

```
shoutem shortcut OpenProductsList
```

<br />
Add it to `extension.json`:

<pre>
{
  "name": "shopify-extension",
  "version": "0.0.1",
  "title": "Shopify Extension",
  "description": "Sell products from your Shopify store",

<span class="newCode">  "shortcuts": [{
    "name": "OpenProductsList"
    "action": "dev-name.shopify-extension.OpenProductsList",
    "title": "List of products",
    "description": "Allow users to check your products on Shopify.",
    "adminPages": []</span>
  }]
}
</pre>

As in previous tutorials, wherever you see `dev-name`, replace it with your developer name.

<br />
Modify `app/shortcuts/OpenProductList.js`:

<pre>
<span class="newCode">import { navigateTo } from 'shoutem/actions';

export default function () {
  return navigateTo({
    screen: 'dev-name.shopify-extension.ProductsList'
  })
}</span>
</pre>

<br />
Notice we're opening `ProductsList`, let's add that screen. Followed by mockups shown in the [previous](TODO) chapter, make initial screen which will list products:

```
shoutem screen ProductsList
```

<br />
We'll add static data, so we can test UI. Modify created file `app/screens/ProductsList.js` into.

```
import React, {
  StyleSheet,
  Component,
  ListView,
} from 'react-native';
import { SpinnerScreen, NavigationBar } from 'shoutem-ui/views';

import ProductRow from '../components/ProductRow';

class ProductsList extends Component {

  getProducts() {
    return [{
      title: 'Shoes',
      desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      img: '/img/product-placeholder.png',
      price: 59,99
    }, {
      title: 'Flowers',
      desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      img: '/img/product-placeholder.png',
      price: 10
    }, { 
      title: 'Laptop',
      desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      img: '/img/product-placeholder.png',
      price: 999
    }, { 
      title: 'Phone',
      desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      img: '/img/product-placeholder.png',
      price: 799
    }]
  }

  getDataSource(products) {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return dataSource.cloneWithRows(products);
  }

  renderRow(product) {
    return (
      <ProductRow product/>
    )
  }

  render() {
    const { products } = this.getProducts();
    return (
      <View>
        <NavigationBar />
        <ListView
          dataSource={this.getDataSource(getProducts())}
          renderRow={product => this.renderRow(product)}
        />
      </View>
    )
  }
}

export default connect((state, ownProps) => state)(ProductsList)
```

<br />
In above code we've included 2 things which we still don't have:

- image in assets
- ProductRow component

<br />
Add following image to your `app/assets/img` folder under `product-placeholder.png` name:

TODO - add picture here ready to download

That picture will serve as placeholder for future picture of products.

Let's add now ProductRow component:

```
shoutem component ProductRow
```

<br />
Modify `app/components/ProductRow.js` so it shows Products properties:

```
import React, {
  Component,
  View,
  Image
} from 'react-native';

import { getAsset } from 'shoutem';

render() {
  let { product, onProductPress } = this.props;

  return (
    <View>
      <Image
        source:{{uri: getAsset(product.img)}}
      />
      <Text>{product.title}</Text>
      <Text>{product.price} $</Text>
    </View>
  )
}
```

<br />
Let's see how our extension looks like! Write:

```
shoutem upload
shoutem install --app [APPID]
```

where you replace [APPID] with actual id of the application.

This is the result that you see in the builder. 

TODO - add image that shows current status of the extension, with hardcoded products with descriptions and product placeholders.

Keep in mind that this is generated with static data. However, we want to actually connect to admin's Shopify store and to get products from there. For that, admin needs to authorize your Shopify app to read data from Shopify. Let's do that by making custom admin page.
