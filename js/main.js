function priceOfUber(name){
  var openPrice,under20kmPrice,over20kmPrice, waitPrice;
  if (name == "grabCar") {
    openPrice = 8000;
    under20kmPrice = 12000;
    over20kmPrice = 10000;
    waitPrice = 2000;
  }else if(name = "grabSUV"){
    openPrice = 9000;
    under20kmPrice = 14000;
    over20kmPrice = 12000;
    waitPrice = 3000;
  }else if(name = "grabBlack"){
    openPrice = 10000;
    under20kmPrice = 16000;
    over20kmPrice = 14000;
    waitPrice = 4000;
  }
  var listPrice = [openPrice,under20kmPrice,over20kmPrice,waitPrice];
  return listPrice;
}

function calculatePrice (amountKm,typeUber,timeWait){
  listPrice = priceOfUber(typeUber);
  var totalPrice = timeWait * listPrice[3] + listPrice[0];
  var distance = 20;

  if (amountKm > 0 && amountKm <= 1) {
    return totalPrice;
  }else if ( amountKm > 1 && amountKm <= distance) {
    totalPrice += listPrice[1] * (amountKm - 1); 
  }else{
    totalPrice += listPrice[1] * (distance - 1) + (amountKm - distance) * listPrice[2];
  }
  return totalPrice;
}

document.getElementById("tinhTien").onclick = function () {
  var amountKm = 10;
  var typeUber = "grabCar";
  var timeWait = 2;
  totalPrice = calculatePrice(amountKm,typeUber,timeWait);
  if(typeUber != null) {
    document.getElementById("xuatTien").innerHTML = totalPrice;
    document.getElementById("xuatTien").style.display = "block";
    console.log(document.getElementById("xuatTien").value);
  }
  else {
    alert('Vui long chon xe');
  }
}
