import React, { Component } from 'react';

export default class ProductSoldFunction extends Component {
    state = { items: [], loading: true };
    componentDidMount() {
        let self = this;

        // Fetch data via ajax 
        var url = "/ProductSold/GetProductSoldList";

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (data) {
                var obj = JSON.parse(data);
                self.setState({
                    items: obj,
                    loading: false
                });
            }

        });
    };


    getList() {
        return (<div>
            <div><button class="ui large primary button" id="AddButton" onClick={this.DropdownAjax}>Add New</button></div>
            <table class="ui celled table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Customer Name</th>
                        <th>Store Name</th>
                        <th>Date Sold</th>
                        <th>Action(edit)</th>
                        <th>Action(delete)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map(item =>

                        <tr key={item.ID}>
                            <td>{item.ProductName}</td>
                            <td>{item.CustomerName} </td>
                            <td>{item.StoreName}</td>
                            <td>{item.DateSold}</td>
                            <td><button class="ui large primary button" id="editButton" onClick={() => this.DropdownAjax(item.ID, item.CustomerId, item.ProductId, item.StoreId)}>Edit</button></td>
                            <td><button class="ui large negative  button" id="deleteButton" onClick={() => this.DeleteFunction(item.ID)}>Delete</button></td>

                        </tr>

                    )}
                </tbody>
            </table>
            <div class="ui small modal " id="myModal" >

                <div class="header">
                    Edit Customer
                </div>
                <div class="content">
                    <form class=" ui huge form" id="SubmitForm">
                        <div class="field"><input type="hidden" id="ProSoldId" name="ID"   text=""/>
                            <label>Customer Name</label>
                            <select id="CustDropDown" name="CustomerId"><option value="0" >Select Customer</option></select>
                            </div>
                             <div class=" field">
                             <label >Product Name</label>
                            <select id="ProDropDown" name="ProductId"><option value="0" >Select Product</option></select>
                            </div><div class="field">
                            <label>Store Name</label>
                            <select id="StoreDropDown" name="StoreId"><option value="0" >Select Store</option></select>

                        </div>
                        <div class="actions">
                            <button class="ui large primary button" id="SaveRecord" onClick={this.SaveFunction} type="submit">Save</button>
                            <button class="ui large black deny button"> Close </button>

                        </div>

                    </form></div></div></div>
        );
    };


    DropdownAjax(ProSoldId,CustId,ProID,StoreId) {
        let self = this;
        $("#myModal").modal("show");
      //  debugger;
        $.ajax({
            type: "GET",
            url: "/ProductSold/GetProductSoldDropdown",
            dataType: "json",
            success: function (data) {
               // debugger;
                $("#ProSoldId").val(ProSoldId);
                for (var i = 0; i < data[1].length; i++) {
                    if (data[1][i].ID == CustId) {
                        $("#CustDropDown").append('<option  value="' + data[1][i].ID + '" selected>' + data[1][i].Name + '</option>');
                    } else {
                        $("#CustDropDown").append('<option  value="' + data[1][i].ID + '" >' + data[1][i].Name + '</option>');

                    }
                };
                for (var i = 0; i <data[0].length;i++) {
                    if (data[0][i].ID == ProID) {
                        $("#ProDropDown").append('<option value="' + data[0][i].ID + '"selected>' + data[0][i].Name + '</option>');
                    }
                    else {
                        $("#ProDropDown").append('<option value="' + data[0][i].ID + '">' + data[0][i].Name + '</option>');

                    }
                };
               
                for (var i = 0; i < data[2].length; i++) {
                    if (data[2][i].ID == StoreId) {
                        $("#StoreDropDown").append('<option value="' + data[2][i].ID + '"selected>' + data[2][i].Name + '</option>');
                    }
                    else {
                        $("#StoreDropDown").append('<option value="' + data[2][i].ID + '">' + data[2][i].Name + '</option>');
                     }
                };
                self.setState({
                    loading: false
                });
                //alert("sucess" + data[0][0].Name);

            },
            error: function (err) {
               // debugger;

                alert("failed");

            }

        });
    };

    

    
     SaveFunction() {
         var data = $("#SubmitForm").serialize();
         //alert(data);
         debugger;
         $.ajax({
             url: "ProductSold/SaveDataInDatabase",
             data: data,
             type: "post",
            
             success: function (result) {
                // var result = JSON.parse(data);
                 debugger;
                 if (result) {
                     debugger;
                     alert("successfully added "+ result);
                 }
                 window.location.href = "/ProductSold/index";
             },
             error: function (err) { alert(err.responseJSON()); }

              
         });

        
         
     };
     DeleteFunction(ProSoldId) {

         var ok = confirm("Do you want to delete " + ProSoldId);
         if (ok) {
             $.post("ProductSold/DeleteProductSold?ID=" + ProSoldId, function (data) {
                 if (data) {
                     alert("Successfully Deleted");

                 } window.location.href = "/ProductSold/index";
             }.bind(this));
         };
    };
     
     render() {
         let contents = this.state.loading
             ? <p><em>Loading...</em></p>
             : this.getList();

         // let el = this.state.items;
         return <div>{contents}</div>;

     }


}