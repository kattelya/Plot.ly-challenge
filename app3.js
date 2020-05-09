function plotData(id) {
    // use d3 library again to read our file 
    d3.json("data/samples.json").then((data)=> {
        //console.log(data)

        //filter our sample values by id again
        var sample = data.samples.filter(s => s.id.toString() === id)[0];

        //create variable to store our filter data into a variable so, it got updated whenever we filter to different otu_ids
        // Reverse the array due to Plotly's defaults week 15 day 3 
        //get and store our top 10 samples for our sampleValues, otu_ids, and labels
        var sampleValues = sample.sample_values.slice(0, 10).reverse();
        var topIds = sample.otu_ids.slice(0, 10).reverse();
        var otuIds = topIds.map(d => "OTU" + d);
        var labels = sample.otu_labels.slice(0, 10);

        // https://plotly.com/javascript/bar-charts/
        // create trace variable for our bar-char
        var traceBar = {
            x: sampleValues,
            y: otuIds,
            hovertext: labels,
            type: "bar",
            orientation: "h",
        };

        // create data variable 
        var barData = [traceBar];

        // create layout variable to display our barplot
        var layoutBar = {
            title: "Individual's Top 10 OTU based on their ID",
            yaxis: {
                tickmode: 'linear',
            },
            margin: {left: 80, right: 400, top: 100, bottom: 100}
        };
        //plot our bar chart
        Plotly.newPlot("bar", barData, layoutBar)


        // https://plotly.com/javascript/dropdowns/  <- create bubble plot 
        // be sure to read from our filter variable stored value while the stored individual is to be use for the bar graph only.  
        var traceBubble = {
            x: sample.otu_ids,
            y: sample.sample_values,
            mode: "markers",
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids,
            }
        };

        var bubbleData = [traceBubble];

        var layoutBubble = {
            xaxis: {title: "OTU ID"},
            height: 500,
            width: 800
        };
        // plot our bubble chart
        Plotly.newPlot("bubble", bubbleData, layoutBubble);
    });
}

// this function is to change our graph whenever it got filter
function optionChanged(id) {
    //this is a selector with new drop down ID and it will
    getInfo(id);
    plotData(id);
}

// this function is to display picture 3 (create a box for us to filter through it based on individual id)
function getInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel for each array and print it to console
        var metadata = data.metadata;
            console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// this function is to initiate data rendering and create the drop down menu
// Week 15 exercise 8 drop down event
function start() {
    //connect to index.html line 25 for us to populate it
    var dropDown = d3.select("#selDataset");
    
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        //use foreach to loop through all the sample dataNames and add them to the drop down
        data.names.forEach(function(key) {
            //add "option" as a tag to our html 
            dropDown.append("option").text(key)
            .property("value");  
        })
        //call all functions to populate our page with filtered data plots 
        getInfo(data.names[0]);
        plotData(data.names[0]);
    });   
}
start();