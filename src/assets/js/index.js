import "../scss/main.scss";
import * as d3 from "d3";

//fetching data using promises
let dataset = d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(res => res.data);
dataset.then(data => {
  //remove the preloader element
   document.getElementById("preloader").remove();

  //event listener for responsive behaviour
  window.addEventListener("resize", render);
  //initail rendering of pages
  render();
  //rendering function get fire when browser is resize
  function render() {
    //targeting div with class display__svg
    const svg = d3.select(".display__svg");

    //margin convention practice
    const windowsize = {
      height: document.querySelector(".display").clientHeight,
      width: document.querySelector(".display").clientWidth,
      margin: { top: 20, right: 100, bottom: 120, left: 100 }
    };

    //calling graph generator
    drawchart(data, svg, windowsize);
  }
});

//graph generator operation
//data: datas information
//selection: svg element
//props: window dimension
function drawchart(data, selection, props) {
  //destructing
  const { width, height, margin } = props;

  //append svg element on page
  let svg = selection.selectAll("svg").data([null]);
  svg = svg
    .enter()
    .append("svg")
    .merge(svg)
    .attr("width", width)
    .attr("height", height);

  //calculate inner height
  const innerHeight = height - margin.top - margin.bottom;

  //calculate inner width
  const innerWidth = width - margin.left - margin.right;

  //barwidth
  const barwidth = innerHeight / data.length;

  //retrieving all the years(string) and converting js data format
  const years = [...data.map(data => new Date(data[0]))];
  // retrieving all the gdps
  const gdp = [...data.map(data => data[1])];

  //create x scale
  const xScale = d3
    .scaleTime()
    .domain([d3.min(years), d3.max(years)])
    .range([0, innerWidth]);

  //creating responsive tick along the x-axis
  const xticksdensity = 70;
  //create an xaxis component with d3.axisbottom
  const xaxis = d3.axisBottom(xScale).ticks(innerWidth / xticksdensity);

  //call the xaxis in a group tag
  let xaxisgroup = svg.selectAll("#x-axis").data([null]);
  xaxisgroup = xaxisgroup
    .enter()
    .append("g")
    .attr("id", "x-axis")
    .merge(xaxisgroup)
    .attr("transform", `translate(${margin.left},${innerHeight + margin.top})`)
    .call(xaxis);

  //create yScale
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(gdp)])
    .range([innerHeight, 0]);
  //creating responsive tick along the y-axis
  const yticksdensity = 70;
  //create an yaxis component with d3.axisLeft
  const yaxis = d3.axisLeft(yScale).ticks(innerHeight / yticksdensity);
  //call the xaxis in a group tag
  let yaxisgroup = svg.selectAll("#y-axis").data([null]);
  yaxisgroup = yaxisgroup
    .enter()
    .append("g")
    .attr("id", "y-axis")
    .merge(yaxisgroup)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  yaxisgroup.call(yaxis);
  //append labels in y axis
  const yaxislabel = yaxisgroup.selectAll(".y-axis-label").data([null]);
  yaxislabel
    .enter()
    .append("text")
    .attr("class", "y-axis-label")
    .merge(yaxislabel)
    .attr("fill", "#dbd5c8")
    .text("gdp")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 5)
    .attr("y", 25);
  
    //creat linearscale
  const linearscale = d3
    .scaleLinear()
    .domain([0, d3.max(gdp)])
    .range([0, innerHeight]);

  //creat newscaledgdp
  let scaledgdp = gdp.map(data => linearscale(data));

  //tootip for displaying information
  const tooltip = selection
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("padding", "5px 7px")
    .style("border", "1px #333 solid")
    .style("border-radius", "5px")
    .style("opacity", "0");

  //append rectangle to the svg
  let rect = svg.selectAll("rect").data(scaledgdp);
  rect = rect
    .enter()
    .append("rect")
    .merge(rect)
    .attr("class", "bar")
    .attr("data-date", (d, i) => data[i][0])
    .attr("data-gdp", (d, i) => data[i][1])
    .attr("x", (d, i) => xScale(years[i]))
    .attr("y", innerHeight)
    .attr("width", barwidth)
    .attr("height", 0)
    .attr("fill", "orange")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .on("mouseover", function(d, i) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", "1");
      tooltip
        .html(
          `
            <label>year: <b>${data[i][0].substring(0, 4)}</b> </label> 
            <br>
            <label>$<b>${data[i][1]} billion</b></label> 
          `
        )
        .attr("data-date", data[i][0])
        .attr("data-gdp", data[i][1])
        .style("left", `${d3.event.pageX}px`)
        .style("top", `${d3.event.pageY}px`);
      d3.select(this).attr("fill", "white");
    })
    .on("mouseout", function() {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
      d3.select(this).attr("fill", "orange");
    });

  //elastic animation
  rect
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .ease(d3.easeElastic)
    .attr("y", d => innerHeight - d)
    .attr("height", d => d);
}
