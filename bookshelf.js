/*main instructions
1- form pop up when empty space is clicked
2- input value stored
    (i) remove pages read input if the checkbox is clicked
3A- after submitting, the new book is added to a library and a book appears on the shelf
    (i) the book must have the details of the added book
3B- after pressing the form cancel button or an area other than the form, the input data on the form and the form are removed
4- clicking on the book makes a menu with the book details appear (also has the cancel way as the form)
5- change the book status by changing the color of the image (also when the pages read and the book length are the same)
*/

let DOM = {
    shelfFrame:document.querySelector('.frame'),
    emptySpace: document.querySelector('.spaces'),
    main: document.getElementById('main'),
    form:document.querySelector('.form'),
    cancelBtn:document.querySelector('.form-cancel-btn'),
    submitBtn:document.querySelector('#submit-btn'),
    book:document.querySelector('.new-space'),
    infoPopUp:document.querySelector('#info'),
    editPopUp:document.querySelector('#edit')
};

//constructor object
class Book{
    constructor(title,author,totalPages,pagesRead,ID){
    this.title = title,
    this.author = author,
    this.totalPages = totalPages,
    this.pagesRead = pagesRead,
    this.ID = ID
        }
    }   
let library =[];
let emptySpace,emptySpaceId;  

//FORM
DOM.shelfFrame.addEventListener('click', event => {  //event delegation
    if (event.target.className==='spaces'){
    
        emptySpace = event.target;
        emptySpaceId = event.target.id;
        
        //form pops up
        document.querySelector('.frame').style.pointerEvents='none';
        DOM.form.style.display = 'block';
        resetInputs();
  
    }
    
    
    });  

 //submitting form  
    DOM.submitBtn.addEventListener('click', event =>{
    let number,HTML, bookHTML, bookNode, newBookHTML, id; 
        //id = last id +1
          id =library.length;
        
        const  inputs = {
            titleInput : document.querySelector('#title-input').value,
            authorInput:document.querySelector('#author-input').value,
            pagesInput :document.querySelector('#pages-input').value,
            pagesReadInput:document.querySelector('#pages-read-input').value      
  
        } 
        let newBook = new Book(inputs.titleInput,inputs.authorInput,inputs.pagesInput, inputs.pagesReadInput,id);
        
        library.push(newBook);
        
        DOM.form.style.display = 'none';
      DOM.shelfFrame.style.pointerEvents="auto";

        //display book
    number = Math.floor(Math.random()*4);
    
    HTML = `<div class="new-space" id="bookSpace-${id}"><img class="book-img" src="book-${number}.png"><img class="cancel-btn" src="cancel icon.png"><div class="p-container"><p class="paragraph" id="paragraph-${id}">%title%(%author%)</p></div></div>`;
    if(inputs.titleInput ==='' && inputs.authorInput===''){
        bookHTML = HTML.replace('%title%(%author%)', '');

    }
    else{
        bookHTML = HTML.replace('%title%(%author%)', `${inputs.titleInput}(${inputs.authorInput})`);

    } 

    bookNode  = document.createRange().createContextualFragment(bookHTML);//changes the string into a node
        event.preventDefault();  
    emptySpace.parentNode.replaceChild(bookNode,emptySpace);
        
  
     
             }); 

DOM.cancelBtn.addEventListener('click',() =>{
    
    DOM.form.style.display="none";
    DOM.shelfFrame.style.pointerEvents="auto";

})



//BOOK
let bookInfo;  
   DOM.main.addEventListener('click', event => {
         
    //book information
       if (event.target.className === 'p-container' || event.target.className === 'book-img'){
          
          
       //retrieve the information of the book clicked (inputs)
           const bookId = event.target.parentNode.id;
          displayBook(bookId);
           
       }
       
       // title(auhthor) sentence
        if (event.target.className === 'paragraph'){

           const bookId1 = event.target.parentNode.parentNode.id;

           displayBook(bookId1);
       }
       
       //remove book info box
        if (event.target.className === 'info-cancel-btn'){
            event.target.parentNode.style.display="none";
            document.querySelector('.frame').style.pointerEvents = 'auto';
        }
       
       //edit book
        if (event.target.id === 'edit-book-btn') {
                   
            DOM.infoPopUp.style.display = 'none';
            
            document.querySelector('.title-edit').value = bookInfo.title; 
            document.querySelector('.author-edit').value = bookInfo.author;
            document.querySelector('.pages-edit').value = bookInfo.totalPages;
            document.querySelector('.pages-read-edit').value = bookInfo.pagesRead;
            
            DOM.editPopUp.style.display = 'block';
   
        }
       //done edit book btn
        if (event.target.id==='edit-done-btn'){
        
        //change the library values with the new values from the inputs
           const newInputs = {
               titleEdit: document.querySelector('.title-edit').value,
               authorEdit: document.querySelector('.author-edit').value,
               pagesEdit: document.querySelector('.pages-edit').value,
               pagesReadEdit:document.querySelector('.pages-read-edit').value
           }
           library.forEach(current => {
               if (current.ID === bookInfo.ID){   
                   current.title = newInputs.titleEdit;
                   current.author = newInputs.authorEdit;
                   current.totalPages = newInputs.pagesEdit;
                   current.pagesRead = newInputs.pagesReadEdit;  
                   
                   document.querySelector('#paragraph-'+ current.ID).textContent = `${newInputs.titleEdit}(${newInputs.authorEdit})`;
                   
                   if(current.totalPages === current.pagesRead){
                     document.querySelector('#bookSpace-'+ current.ID).style.border= '1.5px solid green';

                   }

               }
               
           });
           
           
             DOM.editPopUp.style.display = 'none';
             document.querySelector('.frame').style.pointerEvents='auto';
       
       
       }     
           
        //remove book button
        if (event.target.className === 'cancel-btn'){
                //remove the parent new-space and add back the old space
        event.target.parentNode.parentNode.replaceChild(DOM.emptySpace, event.target.parentNode)
                 }   

   
       
   DOM.emptySpace.style.pointerEvents="auto";
   }); 

             
function resetInputs(){
        document.querySelector('#title-input').value="";
         document.querySelector('#author-input').value='';
        document.querySelector('#pages-input').value='';
        document.querySelector('#pages-read-input').value='';    
}



function displayBook(bookLocation){
            DOM.form.style.display = 'none';

             const bookIdSplit = bookLocation.split('-');
           
           const num = parseFloat(bookIdSplit[1]);
           
           for(var i=0; i<20; i++){  
                if(library[i].ID===num){
                bookInfo = library[i]; 
                 break;
                }
            }
           
        // change the html of the book info pop up with the retireved info
           document.querySelector('.title-info').textContent = `Title: ${bookInfo.title}`;
           document.querySelector('.author-info').textContent = `Author: ${bookInfo.author}` ;
           document.querySelector('.pages-info').textContent = `Pages: ${bookInfo.totalPages} pages`;
           document.querySelector('.pages-read-info').textContent = `Pages read: ${bookInfo.pagesRead} pages`; 
        //display the book pop up
           DOM.infoPopUp.style.display="block";
           document.querySelector('.frame').style.pointerEvents='none';
    
      

}

























