const express = require("express")
const router = express.Router();
const db = require("../startup/db")

router.get('/', async (req,res) =>
{

    try{
        const users = await db.query('SELECT * FROM products ');
        res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})  


router.get('/:location', async (req,res) =>
{

    try{
        const users = await db.query(`SELECT * FROM products where manufacturer_location='${req.params.location.slice(1)}'`);
        res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})  


router.get('/:checker', async (req,res) =>
{

    try{
        const users = await db.query(`SELECT * FROM products where in_usa=${req.params.checker.slice(1)}`);
        res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})  

router.get('/quantity', async (req,res)=>
{
    try{
        const users = await db.query("SELECT * from products order by quantity ;");
        res.send(users)
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})


router.get('/latest', async (req,res)=>
{
    try{
        const users = await db.query("SELECT * from products order by created_date desc ;");
        res.send(users)
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})


router.get('/:certificate',  async(req,res) =>
{

  
  const certificate  = req.params.certificate.slice(1);
  
  
  
  try{
  
              const users = await db.query(`SELECT * from products where  product_id = (select product_id from product_certificate_bridge where certificate_id = (select certificate_id 
  
                  from product_certificate where certificate_name = '${certificate}')) `);
  
              res.send(users);
  
  }
  
  catch(e)
  
  {
  
      res.status(404).send("Error")
  
  }
})

router.get('/:name',  async(req,res) =>
{
        const NAME= req.params.name.slice(1);
    try{
                const users = await db.query(`SELECT * from products where category_id = (SELECT category_id FROM  category where  category_name='${NAME}'); `);
                res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})



router.get('/:low/:high',  async(req,res) =>
{
    const lower_limit  = req.params.low.slice(1);
    const upper_limit  = req.params.high.slice(1);

    try{
                const users = await db.query(`SELECT * from products where  price between ${lower_limit} and ${upper_limit}; `);
                res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})




router.get('/price/asc',  async(req,res) =>
{
        //const NAME= req.params.name;
    try{
                const users = await db.query(`SELECT * from products  ORDER BY price ; `);
                res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})

router.get('/price/desc',  async(req,res) =>
{
        //const NAME= req.params.name;
    try{
                const users = await db.query(`SELECT * from products  ORDER BY price DESC; `);
                res.send(users);
    }
    catch(e)
    {
        res.status(404).send("Error")
    }
})


module.exports = router