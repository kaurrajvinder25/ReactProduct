using ReactProductSold.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactProductSold.Controllers
{
    public class CustomerController : Controller
    {

        ProductSalesEntities1 db = new ProductSalesEntities1();

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetCustomerList()
        {
            // List<Customer> data= db.Customers.ToList();
            List<CustomerViewModel> data = db.Customers.Select(x => new CustomerViewModel
            {

                ID = x.ID,
                Name = x.Name,
                Address = x.Address
            }).ToList();
            Console.WriteLine(data);
            return  Json(data,JsonRequestBehavior.AllowGet );
        }

        [HttpGet]
        public JsonResult GetCustomerByID(int id)
        {
            
            //  Customer data = db.Customers.Find(id);
            CustomerViewModel data = db.Customers.Select(x => new CustomerViewModel
            {

                ID = x.ID,
                Name = x.Name,
                Address = x.Address
            }).FirstOrDefault(x => x.ID == id);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveDataInDatabase(CustomerViewModel model)
        {
            var result = false;
            try
            {
                if (model.ID > 0)
                {
                    Customer cust = db.Customers.SingleOrDefault(x=> x.ID == model.ID);
                    cust.Name = model.Name;
                    cust.Address = model.Address;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    Customer cust = new Customer();
                    cust.Name = model.Name;
                    cust.Address = model.Address;
                    db.Customers.Add(cust);
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
        public JsonResult DeleteCustomer(int id)
        {
            bool result = false;

            Customer cust = db.Customers.Find(id);
            if (cust != null)
            {

                db.Customers.Remove(cust);
                db.SaveChanges();
                result = true;

            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    

       
    }
}
