const express = require('express');
const ExpressError = require('./expressError');

const app = express();



app.get('/mean/:nums',  (req, res, next)=> {
  const ans = req.params.nums.split(',');
  const lenOfValues = ans.length;
  let mean=0 ;
  try {
    for(let i =0; i< lenOfValues; i++) {
      if( isNaN(parseInt(ans[i])) )  throw new ExpressError(`${ans[i]} is not a number`,404)
      mean = mean + parseInt(ans[i]);
    }
    let response =  {operation: "mean", value: lenOfValues, mean: mean/lenOfValues};
  
    return res.json({
      response 
    }); 
  } catch (err) {
    return next(err);
  }
});

app.get('/median/:nums',  (req, res, next)=> {
    const ans = req.params.nums.split(',').sort((a,b) => { return a - b;} );
    const lenOfValues = ans.length;
    try {
        for (val of ans )
        {
          if (isNaN(parseInt(val))) throw new ExpressError(`${val} is not a number`,404)
        }
        if(lenOfValues%2 != 0) {
          return res.json({
              operation : "median",
              value : lenOfValues,
              median : parseInt(ans[((lenOfValues+1)/2)-1])
            });
        }
      else
        {
          return res.json({
              operation : "median",
              value : lenOfValues,
              median : (parseInt(ans[((lenOfValues)/2)-1]) + parseInt(ans[(lenOfValues/2)]))/2
            });
        }
    } catch (e)
    {
       return next(e)
    }
  });

  app.get('/mode/:nums',  (req, res, next)=> {
    const ans = req.params.nums.split(',');
    const lenOfValues = ans.length;
    let temp={};
    let maxVal='', occ=0;
  
    for (val of ans )
    {
      if (temp[val]) temp[val]++;
      else temp[val] = 1;
      if (occ < temp[val]) {
        maxVal = val;
        occ = temp[val];
      }
    }
    let response =  {operation : "mode", value : lenOfValues, mode : maxVal, Occurence : occ};
    return res.json({
       response
      });
  });

app.use( (req, res, next) => {
  const e = new ExpressError("Bad Request ",404);
  next(e);
})  


app.use( (error, req, res, next) => {
  res.status(error.status).send(error.message);
})
app.listen(3000,  () => {
  console.log('App on port 3000');
})