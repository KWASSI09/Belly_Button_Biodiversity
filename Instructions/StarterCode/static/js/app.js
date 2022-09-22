
d3.json("data/samples.json").then((data)=> {

      console.log(data.names);

      data.names.forEach((id)=>{
        console.log(id)


      })

})



  