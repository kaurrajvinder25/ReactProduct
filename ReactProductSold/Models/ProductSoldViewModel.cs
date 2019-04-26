using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReactProductSold.Models
{
    public class ProductSoldViewModel
    {
        public int ID { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}", ApplyFormatInEditMode = true)]
        public System.DateTime DateSold { get; set; }

        public String ProductName { get; set; }
        public String CustomerName { get; set; }
        public String StoreName { get; set; }

       
    }
}