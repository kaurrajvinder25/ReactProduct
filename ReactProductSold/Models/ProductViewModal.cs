using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace ReactProductSold.Models
{
    public class ProductViewModal
    {

        public int ID { get; set; }

        [DisplayName("Product Name")]
        public string Name { get; set; }
        public double Price { get; set; }
    }
}