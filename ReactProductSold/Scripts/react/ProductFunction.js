import React, { Component } from 'react';

 export default class ProductFunction extends Component {
     state = { items: [], loading: true };
     componentDidMount() {
         let self = this;

         // Fetch data via ajax 
         var url = "/Product/GetProductList";

         $.ajax({
             type: 'GET',
             url: url,
             //dataType: 'json',
             success: function (data) {
                 self.setState({
                     items: data,
                     loading: false
                 });
             }

         });
     };


     getList() {
         return (<div>
             <div><button class="ui large primary button" id="AddButton" onClick={this.AddFunction}>Add New</button></div>
             <table class="ui celled table">
                 <thead>
                     <tr>
                         <th>Product Name</th>
                         <th>Price</th>
                         <th>Action(edit)</th>
                         <th>Action(detail)</th>
                         <th>Action(delete)</th>
                     </tr>
                 </thead>
                 <tbody>
                     {this.state.items.map(item =>

                         <tr key={item.ID}>
                             <td>{item.Name}</td>
                             <td>{item.Price}</td>
                             <td><button class="ui large primary button" id="editButton" onClick={() => this.editAjax(item.ID, "edit")}>Edit</button></td>
                             <td><button class="ui large positive button" onClick={() => this.editAjax(item.ID, "detail")}>Detail</button></td>
                             <td><button class="ui large negative  button" onClick={() => this.editAjax(item.ID, "delete")}>Delete</button></td>

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
                         <div class=" field">
                             <input type="hidden" id="ProId" name="ID" placeholder=" Name" />
                             <label >Product Name</label>
                             <input type="text" id="ProName" name="Name" placeholder="Product Name" />
                         </div><div class="field">
                             <label>Product Price</label>
                             <input type="text" id="ProPrice" name="Price" placeholder="Price" />
                         </div>
                         <div class="actions">
                             <button class="ui large primary button" id="SaveRecord" onClick={this.SaveFunction} type="submit">Save</button>
                             <button class="ui large red button" id="deleteRecord" onClick={this.DeleteFunction} type="submit">Delete</button>
                             <button class="ui large black deny button"> Close </button>

                         </div>

                     </form></div></div></div>
         );
     };

     editAjax(id, btnname) {

        // alert(btnname);
         let self = this;
       //  $("#myModal").modal("show");
         $.ajax({
             type: 'Get',
             url: "/Product/GetProductByID?ID=" + id,
            // dataType: 'json',
             id: id,
             success: function (data) {
                 $("#myModal").modal("show");
                 //alert("success" + data.ID);
                 //  var obj = JSON.parse(data);
                 if (btnname == "edit") {
                     $("#ProId").val(data.ID);
                     $("#ProName").val(data.Name)
                     $("#ProPrice").val(data.Price)
                     $("#deleteRecord").hide();
                 }


                 else {
                     $("#ProId").val(data.ID).prop("readonly", true)
                     $("#ProName").val(data.Name).prop("readonly", true)
                     $("#ProPrice").val(data.Price).prop("readonly", true)

                     $("#SaveRecord").hide();
                     if (btnname == "detail") { $("#deleteRecord").hide(); }


                 }
                 self.setState({
                     loading: false
                 });
             }

         });

     };

     AddFunction() {
         $("#myModal").modal('show');
         $("#deleteRecord").hide();
     };
     SaveFunction() {
         var data = $("#SubmitForm").serialize();
         debugger;
         //$.get("Product/SaveDataInDatabase?" + data, function (data) {

         //    alert("done");
         //}.bind(this));
         $.ajax({
             url: "product/savedataindatabase",
             data: data,
             type: "post",
             success: function (result) {
                 debugger;
                 if (result) {
                     alert("successfully added");
                 }

             }
         });

        
         
     };
     DeleteFunction() {
         const id = $("#ProId").val();
         //alert(id);
         var ok = confirm("Do you want to delete ");
         if (ok) {
             $.get("Product/DeleteProduct?ID=" + id, function (data) {
                 alert("done");
             }.bind(this));
         };
     }
     
     render() {
         let contents = this.state.loading
             ? <p><em>Loading...</em></p>
             : this.getList();

         // let el = this.state.items;
         return <div>{contents}</div>;

     }



    
}