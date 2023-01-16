function getEle(id) {
  return document.getElementById(id);
}

function getQuery(query) {
  return document.querySelector(query);
}

class Information {
  constructor(service,soKm,price,totalPrice){
    this.service = service;
    this.amountKm = soKm;
    this.price = price;
    this.totalPrice = totalPrice;
  }
}

class Grab {
  constructor(modelCar,priceOfOneKm,priceUnder20km,priceOver20km,priceWait){
    this.startKm = 1;
    this.amountKm = 0;
    this.timeWait = 0;
    this.distance = 20;
    this.modelCar = modelCar;
    this.priceOfOneKm = priceOfOneKm;
    this.priceUnder20km = priceUnder20km;
    this.priceOver20km = priceOver20km;
    this.priceWait = priceWait;
  }
  getInforOpen() {
    var open = new Information('grabCar 1km(mở cửa)',1,this.priceOfOneKm,this.priceOfOneKm);

    return open;
  }

  getInforUnder20km() {
    var kmUnder20 = this.amountKm - this.startKm;
    if (this.amountKm > 20){
      kmUnder20 = this.distance - this.startKm;
    }
    var totalPriceUnder20 = kmUnder20 * this.priceUnder20km;
    var under20km = new Information('grabCar dưới 20km',kmUnder20,this.priceUnder20km,totalPriceUnder20);

    return under20km;
  }

  getInforOver20km() {

    var kmOver20 = this.amountKm - this.distance;
    var totalPriceOver20 = kmOver20 * this.priceOver20km;
    var over20km = new Information('grabCar trên 20km',kmOver20,this.priceOver20km,totalPriceOver20);

    return over20km;
  }

  getInforWait() {
    var totalPriceWait = this.timeWait * this.priceWait

    var waitInfo = new Information('Thời gian đợi',this.timeWait,this.priceWait,totalPriceWait);
    return waitInfo;
  }

  getInforPayment() {
    let totalPayment;

    totalPayment = this.getInforWait().totalPrice + this.getInforOpen().totalPrice;

    if (this.amountKm > 0 && this.amountKm <= 1) {
      return totalPayment;
    }else if ( this.amountKm > 1 && this.amountKm <= this.distance) {
      totalPayment += this.getInforUnder20km().totalPrice;
    }else{
      totalPayment += this.getInforUnder20km().totalPrice + this.getInforOver20km().totalPrice;
    }

    return totalPayment;
  }
}

const grabCar = new Grab("grabCar",8000,12000,10000,2000);
const grabSUV = new Grab("grabSUV",9000,14000,12000,3000);
const grabBlack = new Grab("grabBlack",10000,16000,14000,4000);

function checkTypeGrab() {
  var valueGrab;
  if (getQuery('input[id="grabCar"]:checked') != null) {
    valueGrab = grabCar;
  }else if(getQuery('input[id="grabSUV"]:checked') != null) {
    valueGrab = grabSUV;
  } else if(getQuery('input[id="grabBlack"]:checked') != null) {
    valueGrab = grabBlack;
  }else {
    valueGrab = null;
  }
  return valueGrab;
}

function getInforUserInput(){
  var grab = checkTypeGrab();
  grab.amountKm = getEle("soKm").value;
  grab.timeWait = getEle("time").value;
  return grab;
}


function calculatePayment(grab) {
    totalPrice = grab.getInforPayment();
    getEle('xuatTien').innerHTML = totalPrice;
    getEle("divThanhTien").style.display = "block";
  
}

getEle("tinhTien").onclick = function () {
  var typeGrab = checkTypeGrab();
  if (typeGrab == null) {
    alert('Vui lòng chọn loại xe: ')
  }else {
    var grab = getInforUserInput();
    if (grab.amountKm <= 0) {
      alert('Vui lòng nhập đúng dữ liệu ')
    }else{
      calculatePayment(grab);
    }  
  }
}

getEle("inHoaDon").onclick = function () { 
  var typeGrab = checkTypeGrab();
  if (typeGrab == null) {
    alert('Vui lòng chọn loại xe: ');
  }else{
    var grab = getInforUserInput();
    if (grab.amountKm <= 0) {
      alert('Vui lòng nhập đúng dữ liệu ')
    }else{
      calculatePayment(grab);
      arr = [grab.getInforOpen(),grab.getInforUnder20km()]
    if (grab.amountKm > 20){
      arr.push(grab.getInforOver20km())
    }
    if (grab.timeWait > 0){
      arr.push(grab.getInforWait())
    }
    renderTable(arr);
    } 
  }
}

function renderTable(arr) {
  var contentHTML = "";
  var grab = getInforUserInput();

  //agrument 1: phan tu of arr, agrument 2: chi so index
  arr.forEach(function(grab){
    contentHTML += `
      <tr>
        <td>${grab.service}</td>
        <td>${grab.amountKm}</td>
        <td>${grab.price} vnd</td>
        <td>${grab.totalPrice} vnd</td>
      </tr>
       ` 
  });
  contentHTML += `
      <tr class="table-success">
        <th scope="row" colspan="3">Tổng</th>
        <td id="totalPrice">${grab.getInforPayment()}</td>
      </tr>
  `
  getEle("tableDetail").innerHTML = contentHTML;
}

