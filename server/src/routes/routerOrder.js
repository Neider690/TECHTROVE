const {Router} = require("express")

const routerOrder = Router();

//RUTAS PARA TODAS LAS ORDENES
routerOrder.get("/", async (req, res) => {
    try {
  
      let orders = await getAllOrders();
  
      res.json(orders);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  });

//RUTA PARA BUSCAR LA ORDEN POR ID
routerOrder.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await getOrder(id);
      res.json(order);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
});

//RUTA POR PERIODO DE TIEMPO
routerOrder.get("/perid/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await getOrderPerId(id);
      res.json(order);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
});

//CREAR LA ORDEN

routerOrder.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newOrder = await createOrder(data);

    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerOrder;