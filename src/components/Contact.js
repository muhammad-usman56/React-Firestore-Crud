import React, { Component } from 'react';
import   '../firebase';
import firebase from 'firebase';
// import firestore from "../firestore";
class Contacts extends Component{
  constructor(props) {
    super(props);  
 this.state={
        fullname:'',
        mobile:'',
        email:'',
        address :'',
        items: [],
        key: '',
        upname:'',
        upmobile:'',
        upemail:'',
        upaddress:'',
  
        
    }
  }
    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(this.state.fullname).set({
          fullname: this.state.fullname,
          email: this.state.email,
          mobile: this.state.mobile,
          address: this.state.address
        });  
      
       
      };
   

      delete=(name)=> {
        const db = firebase.firestore();
      db.collection('users').doc(name).delete();

      }
      getMyStory() { /* Remove arrow function */
        const db = firebase.firestore();
        db.collection("users")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          console.log(data);
          this.setState({ items: data });
        });
      
      
    }



componentDidMount(){
    this.getMyStory();
    
  



}
updateDone = ()=>{
  const db = firebase.firestore();
  db.collection("users").doc(this.state.upname).update({
      
     
      email:this.state.upemail,
      mobile:this.state.upmobile,
      address:this.state.upaddress
      });
     
      }
      update=(name,email,mobile,address)=> {
     
        this.setState({upname:name});
        this.setState({upemail:email});
        this.setState({upmobile:mobile});
        this.setState({upaddress:address});

      
      }

  

render(){
  var { items = [] } = this.props;
return(
    <>



<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Values</h5>




        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form autoComplete='on'  >
    
   
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-mobile-alt'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Mobile' name='mobile'
    value={this.state.upmobile}
    onChange={e=> this.setState({upmobile:e.target.value})}
  
        />
    
 





    </div>





    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-envelope'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Email' name='email'
    value={this.state.upemail}
    onChange={e=> this.setState({upemail:e.target.value})}
       
        />
       
    
    </div>
    <div className='form-group input-group col-md-12'>
        
        <textarea className='form-control' placeholder='Address' name='address'
     value={this.state.upaddress}
     onChange={e=> this.setState({upaddress:e.target.value})}
     
       
        />
       
    </div>
    
        
    
   </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="submit" value="save" className='btn btn-primary'  onClick={() => this.updateDone()}/>
      
      </div>
    </div>
  </div>
</div>



    
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4 text-center">Contact Form</h1>
  {console.log(this.state)}
  {console.log(this.state.items)}
  </div>
</div>
      <div className='row'>
          <div className="col-lg-4 col-md-4 col-sm-12">
          <form autoComplete='off' onSubmit={this.addUser} >
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-user'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Full name' name='fullname'
      onChange={e=> this.setState({fullname:e.target.value})}
        />

    </div>
   
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-mobile-alt'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Mobile' name='mobile'
     onChange={e=> this.setState({mobile:e.target.value})}
        />
    
 





    </div>
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-envelope'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Email' name='email'
       onChange={e=> this.setState({email:e.target.value})}
        />
       
    
    </div>

    <div className='form-group input-group col-md-12'>
        
        <textarea className='form-control' placeholder='Address' name='address'
        onChange={e=> this.setState({address:e.target.value})}
        
       
        />
       
    </div>
    
        <input type="submit" value="save" className='btn btn-primary btn-block'/>
        
   </form>
   
          </div>

          
          <div className="col-lg-8 col-md-8 col-sm-12">
              <div>List of Contacts</div>
              <div className='form-group input-group col-md-12'>
              <div className='input-group-prepend'>

        </div>
       
       
    
    </div>
             
              
        
              <table class="table table-striped">
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody >
   
    {this.state.items.map(data=>{
          return(
      <tr>
        <td>
 {data.fullname}
    </td>
    <td>
 {data.email}
    </td>
    <td>
 {data.mobile}
    </td>
    <td>
 {data.address}
    </td>
    <td> 
      <button className='fa fa-trash'  onClick={() => this.delete(data.fullname)}>
</button>
<button className="fa fa-bell" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" onClick={() => this.update(data.fullname,data.email,data.mobile,data.address)}  ></button>
    </td>
    </tr>
            );    
          })} 
    </tbody>
  </table>
          </div>
      </div>

      </>
);
}
}
export default Contacts;