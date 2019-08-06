# Data Visualization Projects - Responsive Visualize Data with a Bar Chart

- Fulfill the below user stories and get all of the tests to pass. Give it your own personal style.

- You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. The tests require axes to be generated using the D3 axis property, which automatically generates ticks along the axis. These ticks are required for passing the D3 tests because their positions are used to determine alignment of graphed elements. You will find information about generating axes at [https://github.com/d3/d3/blob/master/API.md#axes-d3-axis](https://github.com/d3/d3/blob/master/API.md#axes-d3-axis). Required (non-virtual) DOM elements are queried on the moment of each test. If you use a frontend framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.
- User Story #1: My chart should have a title with a corresponding `id="title"`.
- User Story #2: My chart should have a g element x-axis with a corresponding `id="x-axis"`.
- User Story #3: My chart should have a g element y-axis with a corresponding `id="y-axis"`.
- User Story #4: Both axes should contain multiple tick labels, each with the corresponding `class="tick"`.
- User Story #5: My chart should have a rect element for each data point with a corresponding `class="bar"` displaying the data.
- User Story #6: Each bar should have the properties data-date and data-gdp containing date and GDP values.
- User Story #7: The bar elements' data-date properties should match the order of the provided data.
- User Story #8: The bar elements' data-gdp properties should match the order of the provided data.
- User Story #9: Each bar element's height should accurately represent the data's corresponding GDP.
- User Story #10: The data-date attribute and its corresponding bar element should align with the corresponding value on the x-axis.
- User Story #11: The data-gdp attribute and its corresponding bar element should align with the corresponding value on the y-axis.
- User Story #12: I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the area.
- User Story #13: My tooltip should have a data-date property that corresponds to the data-date of the active area.
  Here is the dataset you will need to complete this project: [https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json)

## Important notes

- This responsive visual graphic chart is built on top of **D3 version 5** library. First thing first, to achieve responisve chart, `window: resize event` is being used.

  ```
  window.addEventListener('resize', somefunction)
  ```

- **D3v5** substituted asynchronous callbacks with promises. Therefore, fetching external data is different from previous version.
  In previous the data used to be fetched in this order

  ```
  var data = d3.json(‘data.json’, function(data){
      //then do something with data
      console.log(data)
  });
  ```

- However, the promises in later version is slightly different from previous one. If, you have no idea what promises is all about? Kindly, do some research on `Javascript’s promises and fetch(url)`. The syntax in **D3v5** looks

  ```
  var data = d3.json(‘data.json’).then(function(data){
      return (data);
  }).catch(function(err){
      console.log(err)
  });
  ```

#### Project Structure

```
Project
│
│   index.html
│   README.md
│   package.json
│   webpack.config.js
└───src
│   │
│   └───assets
│       └───js
│           └───index.js
│       └───scss
│            └───main.scss
│
│
│
└───dist
```

### Technologies used

- webpack.
- sass
- ES6
- svg
- D3.js v5

Clone this repo:

```
$ git clone https://github.com/avatarfreak/responsive-bar-chart
```

Install all dependancies:

```
$ npm install
```

Start the server:

```
$ npm run start:dev
```

#### Author

- [avatarfreak](https://github.com/avatarfreak "avatarfreak")
