const container= document.querySelector('.container')
const seats= document.querySelectorAll('.rows .seat:not(.occupied)')
const count=document.getElementById('count')
const total = document.getElementById('total')
const movieSelect= document.getElementById('movie')
let ticketprice = +movieSelect.value
// console.log(typeof ticketprice); // it is now string so need to change it we can 
// change by writing parseInt but we can also change by putting + sign

populateUI()

function setMovieData(movieIndex,moviePrice){
  localStorage.setItem('selectedmovieIndex',movieIndex)
  localStorage.setItem('price',moviePrice)

}

function updateSelectedCount()
{
  const  selectedseats = document.querySelectorAll('.rows .seat.selected')

  // now we need to store the data into local storage
  // this selectedseats retuns an nodelist array so we 
  // grab the index of array
  // map it and return an array indexes throught ... spread operator 

  const seatIndex = [...selectedseats].map(seat => [...seats].indexOf(seat))
  localStorage.setItem('seatselected',JSON.stringify(seatIndex))

  const selectedseatscount = selectedseats.length
  count.innerHTML=selectedseatscount
  total.innerHTML= selectedseatscount * ticketprice

}

// Populate UI data

function populateUI(){
  const seatselected= JSON.parse(localStorage.getItem('seatselected'))
  
  if(seatselected !== null && seatselected.length>0)
  {
    seats.forEach(function(seat,index){
        if(seatselected.indexOf(index)> -1)
        {
          seat.classList.add('selected')
        }
      
    });
  }
  const selectedmovieIndex = localStorage.getItem('selectedmovieIndex')
  movieSelect.selectedIndex=selectedmovieIndex  
}

// Movie Event Listener

movieSelect.addEventListener('change', e => {
  ticketprice = +e.target.value
  // Now we want to set movie Data also in local storage
  setMovieData(e.target.selectedIndex,e.target.value);
  updateSelectedCount()
})

container.addEventListener('click', e =>{
  if(e.target.classList.contains('seat') && 
  !e.target.classList.contains('occupied')){
    // here this if is checking the seats if this belongs to seat class 
    // and also it is checking if it occupied or not

    // we can toggle the class list means we can assign any class by using toggle
    // classlist is 
    e.target.classList.toggle('selected')

    updateSelectedCount()

  }
})
updateSelectedCount()