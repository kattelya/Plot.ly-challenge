// use some code from day3 plotly exercise #6
// missing bar chart and bubble chart for this homework 

// create function to build bar chart and bubble chart 
function barChar(id) {
    barChar(dataName)
}

// Line 25 HTML and filter through new data
function optionChanged(newData) {
    //this is a selector with new drop down ID and it will
    getInfo(newData);
    barChart(newData);
    // add 1 bar chart function and 1 chart function 
}

function getInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
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

function start() {
    //connect to index.html line 25 for us to populate it
    var dropDown = d3.select("#selDataset");
    
    d3.json("data/samples.json").then((data)=> {
        var dataNames = data.names;
        
        //use foreach to loop through all the sample dataNames and add them to the drop down
        dataNames.forEach((key) => {
            //add "option" as a tag to our html 
            dropDown.append("option").text(key)
            .property("value", key);        
        })
        getInfo(dataNames[0]);
        barChart(dataNames[0]);
        //add the bubble later for 
    });   
}

// run the function in order to populate and have the drop down. 
start(); 
