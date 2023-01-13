class Car {
  constructor(modelCar,priceOfOneKm,priceUnder20km,priceOver20km,priceWait){
    this.modelCar = modelCar;
    this.priceOfOneKm = priceOfOneKm;
    this.priceUnder20km = priceUnder20km;
    this.priceOver20km = priceOver20km;
    this.priceWait = priceWait;
    this.distance = 20;
  }
  calculateAmountKmUnder20(amountKm) {
    return amountKm - 1
  }

  calculateAmountKmOver20(amountKm) {
    return amountKm - this.distance
  }

  calculatePriceUnder20(amountKm) {
    return this.calculateAmountKmUnder20(amountKm) * this.priceUnder20km
  }

  calculatePriceOver20(amountKm) {
    return this.calculateAmountKmUnder20(amountKm) * this.priceOver20km
  }

  calculateTotalPriceWait(timeWait) {
    return this.priceWait * timeWait
  }

  calculateTotalPrice(timeWait,amountKm) {
    let totalPrice;
    totalPrice = this.calculateTotalPriceWait(timeWait) + this.priceOfOneKm;
    if (amountKm > 0 && amountKm <= 1) {
          return totalPrice;
    }else if ( amountKm > 1 && amountKm <= this.distance) {
      totalPrice += this.calculatePriceUnder20(amountKm) ;
    }else{
      totalPrice += this.calculatePriceUnder20(amountKm) + this.calculatePriceOver20(amountKm);
    }
    return totalPrice;
  }
}

const grabCar = new Car("grabCar",8000,12000,10000,2000);
const grabSUV = new Car("grabSUV",9000,14000,12000,3000);
const grabBlack = new Car("grabBlack",10000,16000,14000,4000);

function checkTypeCar() {
  var valueCar;
  if (document.querySelector('input[id="grabCar"]:checked') != null) {
    valueCar = grabCar;
  }else if(document.querySelector('input[id="grabSUV"]:checked') != null) {
    valueCar = grabSUV;
  } else if(document.querySelector('input[id="grabBlack"]:checked') != null) {
    valueCar = grabBlack;
  }else {
    valueCar = null;
  }
  return valueCar;
}

document.getElementById("tinhTien").onclick = function () {
  var car = checkTypeCar();
  var amountKm = document.getElementById("soKm").value;
  var timeWait = document.getElementById("time").value;
  if (car == null) {
    alert('Vui lòng chọn loại xe: ')
  }else {
    totalPrice = car.calculateTotalPrice(timeWait ,amountKm);
    document.getElementById('xuatTien').innerHTML = totalPrice;
    document.getElementById("divThanhTien").style.display = "block";
  }
}

document.getElementById("inHoaDon").onclick = function () { 
  var car = checkTypeCar();
  var amountKm = document.getElementById("soKm").value;
  var timeWait = document.getElementById("time").value;
  if (car == null) {
    alert('Vui lòng chọn loại xe: ');
  }else{
    totalPrice = car.calculateTotalPrice(timeWait ,amountKm);
    document.getElementById('xuatTien').innerHTML = totalPrice;
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById('typeCar').innerHTML = car.modelCar;
    document.getElementById('modelCar').innerHTML = car.modelCar;
    document.getElementById('totalPrice').innerHTML = totalPrice;
    document.getElementById('oneKm').innerHTML = car.priceOfOneKm;
    document.getElementById('priceOne').innerHTML = car.priceOfOneKm;
    document.getElementById('totalKm').innerHTML = car.calculateAmountKmUnder20(amountKm) + 'km';
    document.getElementById('priceKm').innerHTML = car.priceUnder20km;
    document.getElementById('priceMoreKm').innerHTML = car.calculatePriceUnder20(amountKm);
    document.getElementById('timeWait').innerHTML = timeWait;
    document.getElementById('costWait').innerHTML = car.priceWait;
    document.getElementById('priceWait').innerHTML = car.calculateTotalPriceWait(timeWait);
  }
}
