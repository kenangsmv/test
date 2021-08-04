const input = document.querySelector('#input'),
add_btn= document.querySelector('#add'),
item=document.querySelectorAll('div[name="item"]'),
delete_btn= document.querySelectorAll("i[name='delete']"),
to_do_items =document.querySelector(".to-do-items"),
select = document.querySelector(".select");


let items;
let completed_items;


add_btn.addEventListener('click', add_item);

to_do_items.addEventListener('click', delete_item);  
     
to_do_items.addEventListener('click', complete_task);  

select.addEventListener('click', filter);


showItems();


function showItems() {
     
    items=getItemFromLocalStorage();

    items.forEach(element => {
         createItem(element);

    });
   


}

function createItem(value) {
    
    let newItem = document.createElement('div');
    newItem.classList="item-box space-between";
    newItem.setAttribute('name', "item")

    let p = document.createElement('p');
    p.textContent = value;
    
    let trash= document.createElement('i');
    trash.classList="fas fa-trash trash-button all-buttons";
    trash.setAttribute('name', "delete");
    
    let done_cancel = document.createElement('i');
    done_cancel.classList="fas fa-check done-button all-buttons";

    let buttons = document.createElement('div');
    buttons.appendChild(done_cancel);
    buttons.appendChild(trash);

    
    newItem.appendChild(p);
    newItem.appendChild(buttons);

    
    to_do_items.appendChild(newItem);

    let comp_item= completeItemFromLocalStorage();
    if( 
        comp_item.includes(newItem.children[0].innerText)
        ) {
        
          newItem.classList.add("completed");
          done_cancel.classList.remove("done-button");
          done_cancel.classList.remove("fa-check");
          done_cancel.classList.add("cancel-button");
          done_cancel.classList.add("fa-times");
          
        }


}

function add_item(e) {
    
     e.preventDefault();

     if (!(input.value === "")) {
         
        createItem(input.value);
  

        setItemToLocalStorage(input.value);
          

        input.value="";

    

     }  
     else {
         alert("please type something");
     }     


}

function delete_item(e) {
   
   let target = e.target;

   Array.from(target.classList).forEach(element => {
       if (element=="fa-trash") {
        e.target.parentElement.parentElement.remove();
        delete_item_fromLocalStorage(e.target.parentElement.parentElement.textContent);
        delete_completed_item_fromLocalStorage(e.target.parentElement.parentElement.textContent);
       }
   });
    
}

function complete_task(e) {
    
    let target = e.target;

    Array.from(target.classList).forEach(element => {
           if (element=="fa-check") {
            target.parentElement.parentElement.classList.add("completed");
            target.classList.remove("fa-check");
            target.classList.add("fa-times");
            target.classList.add("cancel-button");
            target.classList.remove("done-button");
            completeItemToLocalStorage(target.parentElement.parentElement.textContent);


           }
           if (element=="fa-times") {
            target.parentElement.parentElement.classList.remove("completed");
            target.classList.remove("fa-times");
            target.classList.add("fa-check");
            target.classList.remove("cancel-button");
            target.classList.add("done-button");
            delete_completed_item_fromLocalStorage(target.parentElement.parentElement.textContent);
           }
       });
     
 
}

function getItemFromLocalStorage() {

      if (localStorage.getItem("items") === null) {
          items=[];
      }
      else {
          items= JSON.parse(localStorage.getItem("items"))
      }

      return items;
}

function setItemToLocalStorage(value) {
    
     items=getItemFromLocalStorage();

     items.push(value);

     localStorage.setItem("items", JSON.stringify(items));

}

function completeItemFromLocalStorage() {
    if (localStorage.getItem("completed_itm")=== null) {
        completed_items=[];
    }
    else{
        completed_items=JSON.parse(localStorage.getItem("completed_itm"));
    }
    return completed_items;
}

function completeItemToLocalStorage(value) {
    completed_items=completeItemFromLocalStorage();
    
    completed_items.push(value);

    localStorage.setItem("completed_itm",JSON.stringify(completed_items));
}

function delete_item_fromLocalStorage(value) {
     
    items=getItemFromLocalStorage();

    items.forEach(function(element,index){

        if (element === value) {
          
            items.splice(index, 1);
        }

    });
    

    localStorage.setItem("items", JSON.stringify(items));


}

function delete_completed_item_fromLocalStorage(value) {
     
    completed_items=completeItemFromLocalStorage();

    completed_items.forEach(function(element,index){

        if (element === value) {
          
            completed_items.splice(index, 1);
        }

    });
    

    localStorage.setItem("completed_itm", JSON.stringify(completed_items));


}

function filter(e) {
    
      let action =to_do_items.childNodes;
       let target = e.target;

      for (let i = 1; i < action.length; i++) {
        if (target.innerText =="All") {
            action[i].classList.add("flex");

        }
        if (target.innerText =="Completed") {

          
            if (action[i].classList.contains("completed")) {
                action[i].classList.add("flex");
                action[i].classList.remove("none");

            }
            else{
                action[i].classList.add("none");
                action[i].classList.remove("flex");

              
          }
             
      }
      if (target.innerText =="Uncomplete") {

          
        if (action[i].classList.contains("completed")) {
            action[i].classList.remove("flex");
            action[i].classList.add("none");
        }
        else{
            action[i].classList.remove("none");
            action[i].classList.add("flex");
          
      }
         
  }
      }



    //  action.forEach(element => {

    //     console.log(element);
        

    // if (target.innerText =="All") {
    //     element.classList +=" flex";
    // }
    // if (target.innerText =="Completed") {

          
    //       if (element.classList.contains("completed")) {
    //         element.classList +=" flex";
    //       }
    //       else{
    //         element.classList +=" none";
            
    //     }
           
    // }
    // // if (target.innerText =="Uncomplete") {

    // //     if (element.classList=="item-box space-between completed flex") {
        
    // //     }
    // //     else{
            
    // //     }
        
    // // }
    //  });

   

}






