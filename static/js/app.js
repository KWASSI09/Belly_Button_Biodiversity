function createcharts(selected){

  console.log(selected)

  

  d3.json("samples.json").then((data)=> {

    console.log(data);
    var sample = data.samples.filter(obj => obj.id == selected)
    console.log(sample);

    var metadata = data.metadata.filter(obj => obj.id == selected)
    console.log(metadata);

    HoriBarChart(sample[0].sample_values.slice(0,10).reverse(),sample[0].otu_ids.slice(0,10).reverse().map(T=>"OTU "+ T),sample[0].otu_labels.slice(0,10).reverse());
    BubbleViz(sample[0].otu_ids,sample[0].sample_values,sample[0].otu_labels);
    BigData(metadata[0]);
    GaugeChart(metadata[0].wfreq);


    
    //var otu_ids = results[0].otu_ids;
    //var otu_labels = results[0].otu_labels;
    //var sample_values = results[0].sample_values;

    //console.log(otu_ids);

    

  }) 
  


}

function HoriBarChart(x,y,text){
  
  var data = [{
    type: "bar",
    x : x,
    y : y,
    text : text,
    orientation:"h"
  }];
  var layout = {
    title:"Top 10 OTUs"
  };

  Plotly.newPlot("bar",data, layout);

} 

function BubbleViz(x,y,text){
   var data = [{
    x : x,
    y : y,
    text : text,
    mode  : "markers",
    marker:{
      size : y.map(size=>size),
      color:x.map(item=>item)

    }
   }];
   var layout = {
    title: "OTU values",
    xaxis:{
      title:{
        text:"OTU ID"
      }
    }
   };
   Plotly.newPlot("bubble",data,layout);


}
function GaugeChart(wfreq) {
    
  var level = parseFloat(wfreq) * 20;

  
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  
  var mainPath = "M -.0 -0.05 L .0 0.05 L ";
  var pathX = String(x);
  var space = " ";
  var pathY = String(y);
  var pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Freq",
      text: "",
      hoverinfo: "text+name"
    },
    {
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [ "#84B589", "#89BB8F", "#8CBF88", "#B7CC92", "#D5E49D",
        "#E5E7B3", "#E9E6CA", "#F4F1E5", "#F8F3EC", "#FFFFFF",]},
      labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  var Gauge = document.getElementById("gauge");
  Plotly.newPlot(Gauge, data, layout);
}

function BigData(data){

  var div = d3.select("#sample-metadata");
  div.html("")
  var list = div.append("ul");
  Object.entries(data).forEach(([key, value])=> {
    list.append("li").text(key + ": " + value);
  });
}


d3.json("samples.json").then((data)=> {

  //console.log(data.names);

  var dropdown= d3.select("#selDataset")

  data.names.forEach((id)=>{

    dropdown.append("option").text(id).property("value",id)


  })
  

  

  createcharts(940)

})

function optionChanged(selected) {

  createcharts(selected)


}

  