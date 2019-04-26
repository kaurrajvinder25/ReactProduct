import React, { Component } from 'react';


//grid table
export default class CustomerFunction extends Component {
 
        state = { items: [],loading:true };
      
    componentDidMount() {
      let self = this;

        var url = "/Customer/GetCustomerList";
       // debugger;
        $.ajax({
            type: 'get',
            url: url,
            success: function (data) {
              //  debugger;
               self.setState({
                   items: data,
                   loading:false
                });
            }
            
        });
    }

        //$.get(url,  (data)=>  {
           
        //        this.setState({
        //            items: data,
        //            loading: false
        //        });
            
        //}.bind(this));

   
    getList() {
        return (<div>
            <div><button class="ui large primary button" id="AddButton" onClick={this.AddNewCustomer}>Add New</button></div>
            <table class="ui celled table">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Action(edit)</th>
                    <th>Action(detail)</th>
                    <th>Action(delete)</th>
                </tr>
            </thead>
            <tbody>
                {this.state.items.map(item =>

                    <tr key={item.ID}>
                        <td>{item.Name}</td>
                        <td>{item.Address}</td>
                        <td><button class="ui large primary button" id="editButton" onClick={() => this.editAjax(item.ID,"edit")}>Edit</button></td>
                            <td><button class="ui large positive button" onClick={() => this.editAjax(item.ID,"detail")}>Detail</button></td>
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
                            <input type="hidden" id="CustId" name="ID" placeholder=" Name" />
                            <label >Customer Name</label>
                            <input type="text" id="CustName" name="Name" placeholder="Customer Name" />
                        </div><div class="field">
                            <label>Customer Address</label>
                            <input type="text" id="CustAdd" name="Address" placeholder="Address" />
                        </div>
                        <div class="actions">
                            <button class="ui large primary button" id="SaveCustomerRecord" onClick={this.SaveCustomer} type="submit">Save</button>
                            <button class="ui large red button" id="deleteCustomerRecord" onClick={this.deleteCustomer}  type="submit">Delete</button>
                            <button class="ui large black deny button"> Close </button>

                         </div>
                       
                    </form></div></div></div>
        );
    };

    editAjax(id, btnname) {
       // alert(btnname);
        let self = this;
       
        $("#myModal").modal("show");
        $.ajax({
            type: 'get',
            url: "/Customer/GetCustomerByID?id=" + id,
            //dataType: 'json',
            //data: id,
            success: function (data) {
               // debugger;
              //  console.log("success" + data.ID);
              // var data = JSON.parse(obj);
                if (btnname == "edit") {
                    $("#CustId").val(data.ID);
                    $("#CustName").val(data.Name)
                    $("#CustAdd").val(data.Address)
                    $("#deleteCustomerRecord").hide();
                }
               
                
                else {
                    $("#CustId").val(data.ID).prop("readonly", true)
                    $("#CustName").val(data.Name).prop("readonly", true)
                    $("#CustAdd").val(data.Address).prop("readonly", true)
                   
                    $("#SaveCustomerRecord").hide();
                    if (btnname == "detail") { $("#deleteCustomerRecord").hide();}
                        
                    
                }
                self.setState({
                    loading: false
                });
            }

        });
    
    }

    
       

    AddNewCustomer() {
        $("#myModal").modal('show');
        $("#deleteCustomerRecord").hide();
    }
           
    SaveCustomer() {
     
        var data = $("#SubmitForm").serialize();
        //alert(data);
        $.ajax({
            type: 'POST',
            url: "/Customer/SaveDataInDatabase",
            data: data  
        }).success(function (res) {
           // debugger;
           // console.log("Successfully Added" );
            alert("Successfully Added" );
            self.setState({
                loading: false
            });
            });
      //  debugger;
    }

    deleteCustomer() {
        
        const id = $("#CustId").val();
        //alert(id);
        var ok = confirm("Do you want to delete "); 
        if (ok) {
            //debugger;
            $.ajax({
                type: 'POST',
                url: "/Customer/DeleteCustomer?id=" + id,
                // data: id,
                success: function (res) {
                  //  debugger;
                    alert("Successfully Deleted" + res);
                    //})
                    //    .success(function (res) {
                    //    console.log("Successfully Deleted" + res);
                    //    alert("Successfully Deleted" + res);
                    self.setState({
                        loading: false
                    });
                }
            });
        }
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.getList();
        console.log(contents);
        // let el = this.state.items;
        return <div>{contents}</div>;  
       
    }
    
   
    
}

