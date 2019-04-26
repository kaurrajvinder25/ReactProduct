using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace ReactProductSold.Models
{
    public class CustomerViewModel
    {


        public int ID { get; set; }
       [DisplayName("Customer Name")]
        public string Name { get; set; }
        public string Address { get; set; }
    }
}