using ReactProductSold.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactProductSold.Controllers
{
    public class ProductController : Controller
    {

        ProductSalesEntities1 db = new ProductSalesEntities1();


        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetProductList()
        {
            //List<Product> data = db.Products.ToList();

            List<ProductViewModal> data = db.Products.Select(x => new ProductViewModal
            {

                ID = x.ID,
                Name = x.Name,
                Price = x.Price
            }).ToList();
           // Console.WriteLine(data);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductByID(int id)
        {
            ProductViewModal  data = db.Products.Select(x => new ProductViewModal
            {

                ID = x.ID,
                Name = x.Name,
                Price = x.Price
            }).FirstOrDefault(x=>x.ID==id);
           // Product data = db.Products.Find(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveDataInDatabase(ProductViewModal model)
        {
            var result = false;
            try
            {
                if (model.ID > 0)
                {
                    Product pro = db.Products.Find(model.ID);
                    pro.Name = model.Name;
                    pro.Price = model.Price;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    Product pro = new Product();
                    pro.Name = model.Name;
                    pro.Price = model.Price;
                    db.Products.Add(pro);
                    db.SaveChanges();
                    result = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteProduct(int id)
        {
            bool result = false;

            Product pro = db.Products.Find(id);
            if (pro != null)
            {

                db.Products.Remove(pro);
                db.SaveChanges();
                result = true;

            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}