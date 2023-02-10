const express = require('express');

const app = express();
 

app.get('/mean/:nums',  (req, res)=> {
  const ans = req.params.nums.split(',');
  const lenOfValues = ans.length;
  let mean=0 ;
  for(let i =0; i< lenOfValues; i++) {
    if(typeof parseInt(ans[i]) != 'number') {
        return res.status(400).json(`${ans[i]} is not a number `) 
    }
    else {
        mean = mean + parseInt(ans[i])
    }
  }
  let response =  {operation: "mean", value: lenOfValues, mean: mean/lenOfValues};
 
  return res.json({
    response 
  }); 
});

app.get('/median/:nums',  (req, res)=> {
    const ans = req.params.nums.split(',').sort((a,b) => { return a - b;} );
    const lenOfValues = ans.length;

    if(lenOfValues%2 != 0) {
        return res.json({
            operation : "median",
            value : ans,
            median : parseInt(ans[((lenOfValues+1)/2)-1])
          });
    }
    else
    {
        return res.json({
            operation : "median",
            value : ans,
            median : (parseInt(ans[((lenOfValues)/2)-1]) + parseInt(ans[(lenOfValues/2)]))/2
          });
    }
     
  });

app.listen(3000,  () => {
  console.log('App on port 3000');
})