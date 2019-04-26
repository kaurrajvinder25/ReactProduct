using ReactProductSold.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactProductSold.Controllers
{
    public class ProductSoldController : Controller
    {

        ProductSalesEntities1 db = new ProductSalesEntities1();
        // GET: ProductSold
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetProductSoldList()
        {
            //List<Product> data = db.Products.ToList();
            List<ProductSoldViewModel> data = db.ProductSolds.Select(x => new ProductSoldViewModel
            {

                ID = x.ID,
                ProductId = x.ProductId,
                ProductName = x.Product.Name,
                CustomerId = x.CustomerId,
                CustomerName = x.Customer.Name,
                StoreId = x.StoreId,
                StoreName = x.Store.Name,
                DateSold = x.DateSold,
               

        }).ToList();
            // Console.WriteLine(data);
            return Json(Newtonsoft.Json.JsonConvert.SerializeObject(data), JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetProductSoldDropdown()
        {
            var data = new List<Object>();
            var prolist = db.Products.Select(x => new ProductViewModal
            {

                ID = x.ID,
                Name = x.Name
                
            }).ToList();
           var custlist = db.Customers.Select(x => new CustomerViewModel
            {
               ID = x.ID,
                Name = x.Name,
               }).ToList();
            var storelist = db.Stores.Select(x => new StoreViewModel
            {
                ID = x.ID,
                Name = x.Name,
            }).ToList();
            data.Add(prolist);
            data.Add(custlist);
            data.Add(storelist);

            // Product data = db.Products.Find(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveDataInDatabase(ProductSoldViewModel model)
        {
            var result = false;
            try
            {
                if (model.ID > 0)
                {
                    ProductSold val = db.ProductSolds.SingleOrDefault(x => x.ID == model.ID);
                    val.CustomerId = model.CustomerId;
                    val.ProductId = model.ProductId;
                    val.StoreId = model.StoreId;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    ProductSold val = new ProductSold();
                    val.CustomerId = model.CustomerId;
                    val.ProductId = model.ProductId;
                    val.StoreId = model.StoreId;
                    val.DateSold = System.DateTime.Now;
                    db.ProductSolds.Add(val);
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
        public JsonResult DeleteProductSold(int id)
        {
            bool result = false;

            ProductSold item = db.ProductSolds.Find(id);
            if (item != null)
            {

                db.ProductSolds.Remove(item);
                db.SaveChanges();
                result = true;

            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}