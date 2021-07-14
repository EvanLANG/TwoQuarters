//=============================================================================
// v 1.1.6
// Some global constants
//=============================================================================
var tqProducts = {
    "HM":
    {
    "1":"豆乳盒子small",
    "2":"豆乳盒子large",
    "3":"水果鲜奶盒子small",
    "4":"水果鲜奶盒子large",
    "5":"提拉米苏small",
    "6":"提拉米苏large",
    "7":"奥利奥盒子small",
    "8":"奥利奥盒子large",
    "9":"麻薯豆乳盒子small",
    "10":"麻薯豆乳盒子large",
    "11":"芋泥麻薯肉松盒子small",
    "12":"芋泥麻薯肉松盒子large",
    "13":"肉松小贝",
    "14":"麻薯肉松小贝",
    "15":"原味木糠杯",
    "16":"奥利奥木糠杯",
    "17":"树莓酸奶布丁",
    "18":"轻芝士蛋糕mini",
    "19":"轻芝士蛋糕small",
    "20":"抹茶千层六寸half",
    "21":"抹茶千层六寸whole",
    "22":"抹茶千层八寸half",
    "23":"抹茶千层八寸whole",
    "24":"可可千层六寸half",
    "25":"可可千层六寸whole",
    "26":"可可千层八寸half",
    "27":"可可千层八寸whole",
    "28":"芝香咸酥",
    "29":"芝士棒",
    "30":"玛德琳",
    "31":"杏仁瓦片",
    "32":"原味雪花酥",
    "33":"可可毛巾卷",
    "34":"抹茶毛巾卷",
    "35":"瑞士卷原味1pc",
    "36":"瑞士卷抹茶1pc",
    "37":"瑞士卷可可1pc",
    "38":"瑞士卷原味whole",
    "39":"瑞士卷抹茶whole",
    "40":"瑞士卷可可whole",
    "41":"可可抱抱卷",
    "42":"抹茶抱抱卷",
    "43":"原味抱抱卷",
    "44":"珍珠奶茶爆浆蛋糕",
    "45":"抹茶爆浆蛋糕",
    "46":"生日蛋糕",
    "47":"宠物蛋糕",
    "48":"豆乳小蛋糕",
    "49":"布丁烧",
    "50":"咖啡盒子小",
    "51":"咖啡盒子大",
    "52":"下午茶套餐",
    "53":"抹茶雪花酥",
    "54":"可可雪花酥",
    "55":"运费-10"
    },
"HMP":
    {
    "0":"0",
    "1":"15.0",
    "2":"23.0",
    "3":"15.0",
    "4":"23.0",
    "5":"15.0",
    "6":"23.0",
    "7":"15.0",
    "8":"23.0",
    "9":"18.0",
    "10":"26.0",
    "11":"18.0",
    "12":"26.0",
    "13":"15.0",
    "14":"17.0",
    "15":"7.0",
    "16":"7.0",
    "17":"9.5.0",
    "18":"8.5.0",
    "19":"7.5.0",
    "20":"37.0",
    "21":"70.0",
    "22":"42.0",
    "23":"80.0",
    "24":"37.0",
    "25":"70.0",
    "26":"42.0",
    "27":"80.0",
    "28":"15.0",
    "29":"15.0",
    "30":"15.0",
    "31":"25.0",
    "32":"25.0",
    "33":"15.8",
    "34":"15.8",
    "35":"6.5",
    "36":"6.5",
    "37":"6.5",
    "38":"19.8",
    "39":"19.8",
    "40":"19.8",
    "41":"13.5",
    "42":"13.5",
    "43":"13.5",
    "44":"23.5",
    "45":"24.5",
    "46":"100.0",
    "47":"100.0",
    "48":"27.5",
    "49":"18.0",
    "50":"18.0",
    "51":"26.0",
    "52":"50.0",
    "53":"25.0",
    "54":"25.0",
    "55":"10.0"
    },
"PM":{
    "1":"Product",
    },
"PMP":{
    "1":"price",
    }
};
var totalPrice = 0;
var totalOrdersCount = 0;
var custOrder ={};
var totalOrders={};
var totalUsers = [];
//========================================================================
function addOrder(){
    var prod_id = $("#tq_prod").val();
    var prod_qty = $("#tq_quan").val();
    if(prod_qty === "0"){
        alert("Quantity can't be empty!");
        return;
    }
    //Check user ID which is phone number to be improve custOrder
    if($("#Order #tq_cust_orders #cust_order_"+ prod_id)[0] !== undefined){
        alert("Duplicated order with the same dessert! Please Delete it from Order to Readd it again!");
        return;
    }


    var p_name = tqProducts.HM[prod_id];
    var p_price = tqProducts.HMP[prod_id];


    // var order_item = "<div id='cust_order_" + prod_id +"' class='cust_order_item'>" +
    // "<p class = 'tq-6-col' data-type='pName'>"+ p_name + "</p>" +
    // "<p class = 'tq-3-col' data-type='pPrice'> Price: "+ p_price + "</p>"+
    // "<p class = 'tq-3-col' data-type='pQuan'> Qty: " + prod_qty +"</p>"+
    // "</div>";
    var order_item = "<tr class='cust_order_item' id='cust_order_"+ prod_id +
        "'><td data-type='pName'>" + p_name + "</td>" +
        "<td data-type='pPrice'>"+ p_price + "</td>" +
        "<td data-type='pQty'>" + prod_qty + "</td>" + 
        "<td class='tq-row'><span onclick='removeItem(event)' class='glyphicon glyphicon-trash row-icon'></span></td></tr>";
    
    $("#tq_cust_orders").append(order_item);
    if(custOrder[prod_id] != undefined)
        custOrder[prod_id] = parseInt(custOrder[prod_id]) + parseInt(prod_qty);
    else
        custOrder[prod_id] = prod_qty;
    //totalPrice +=  parseInt(p_price) * parseInt(prod_qty); 
    calcOrder();
}
//========================================================================
function removeItem(e){
    if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.outerHTML.indexOf('tabTwoTotalP') > -1)
        return;
    e.target.parentElement.parentElement.remove();
    var prod_id = e.target.parentElement.parentElement.id.split("_")[2];
    custOrder[prod_id] = 0;
    calcOrder();
  }

//========================================================================
function generateMenuDropdown(){
    for(var i=1; i < Object.keys(tqProducts.HM).length + 1;i++){
        if(tqProducts.HM[i] !== undefined){
            var opTag = document.createElement("option");
            opTag.value = i;
            opTag.textContent = tqProducts.HM[i];
            $("#tq_prod").append(opTag);
        }
    }
}
//========================================================================
function calcOrder(){
    //console.log(custOrder);
    var price = 0;
    for(var id in custOrder){
        if(custOrder[id] !== undefined){
            price += parseFloat(tqProducts.HMP[id]) * parseInt(custOrder[id]);
        }
    }
    $("#tq_cust_orders_price").text(price.toFixed(1));
}
//========================================================================
function addToDoc(){
    var name = $("#tq_name").val();
    var phone = $("#tq_phone").val();
    var address = $("#tq_address").val();
    var remark = $("#tq_remark").val();
    //Check the phone format
    if(phone.length !== 10){
        alert("Please enter the correct phone number with 10 digits!");
        return;
    }
    //Check user ID which is phone number
    if($("#totalOrders_"+phone)[0] !== undefined){
        alert("Duplicated customer with the same phone number! Delete it from TotalOrders to Readd it again!");
        return;
    }




    for(i=1; i < 100;i++){
        if(custOrder[i] !== undefined){
            if(totalOrders[i] == undefined){
                totalOrders[i] =  parseInt(custOrder[i]);
            }
            else{
                totalOrders[i] = parseInt(totalOrders[i]) + parseInt(custOrder[i]);
            }
            
        }
    }

    totalOrdersCount += 1;
    // $("#total_orders_count").text(totalOrdersCount);
    updateTotalOrderCount(totalOrdersCount);

    var totalOrders_item = "<div id='totalOrders_" + phone + "' style='border-bottom:1px solid #828282;overflow-y:auto;' data-type='total_order_item'>" +
    "<p class='col-sm-1 form-group' data-type='id'>"+ totalOrdersCount +". </p><p class='col-sm-5 form-group' data-type='name'>" + name + "</p><p class='col-sm-5 form-group' data-type='phone'>" + phone + "</p>"+
    "<input data-totalOrders-checked='totalOrdersItem' data-id='"+ phone +"' col-sm-1 form-group' type='checkbox' style='height:30px;width:30px;position:absolute;right:10px;'/>" +
    "<p class='col-sm-12 form-group' data-type='addr'>"+ address + "</p>" +
    "<p class='col-sm-12 form-group' data-type='remark'>"+ remark + "</p>" +
    "</div>";

    $("#total_order_info").append(totalOrders_item);

    // $("#tb_"+phone).html($("#tq_cust_orders").parent().html());
    $("#totalOrders_" + phone).append($($("#tq_cust_orders").parent().parent().clone(false).removeClass('row').addClass('tabTwoTotalP')));
    // $("#total_order_info").append($($("#tq_cust_orders").parent().clone()));
    // $("#tq_cust_orders").parent().clone().appendTo("#totalOrders_"+phone);
    totalUsers.push(phone);
    clearUser();

}
//========================================================================
function clearUser(){
    $("#tq_name").val("");
    $("#tq_phone").val("");
    $("#tq_address").val("");
    $("#tq_remark").val("");
    $("#tq_prod").val("0");
    $("#tq_quan").val("1");
    $("#tq_recordToParse").val("");
    $("#tq_cust_orders_price").text("0");
    custOrder ={};
    $("#Order #tq_cust_orders tr").remove();
}
//========================================================================
var orderCHK_flag = false;
function checkTotalOrders(){
    orderCHK_flag = false;
    $("[data-totalOrders-checked]").each(
        function(key,item){
            if(item.checked === false){
                alert("All orders must be confirmed and checked!");
                orderCHK_flag = true;
                return;
            }
        }
    );
}
//========================================================================
function generateDoc(){
    //Check orders
    //checkTotalOrders();
    // if(orderCHK_flag)
    //     return;

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() + 1;
    var curDate = year +"-" + month +"-" + day;
    var doc = new DDoc();
    doc.addHeader("Two Quarters _ "+ curDate, doc.HeaderType.H1);
    doc.addHeader("Total Orders: " + totalOrdersCount , doc.HeaderType.H3);
    // doc.addParagraph(totalOrders[0]);

    //======================================================

    for(i=0;i<totalUsers.length;i++){
        var i_id = totalUsers[i];
        var o_id = "#totalOrders_"+ i_id;
        var i_seq = $(o_id + " [data-type = id]").text();
        var i_name = $(o_id + " [data-type = name]").text();
        var i_phone = $(o_id + " [data-type = phone]").text();
        var i_addr = $(o_id + " [data-type = addr]").text();
        var i_remark = $(o_id + " [data-type = remark]").text();
        var i_totalPrice = $(o_id + " #tq_cust_orders_price").text();
        var cust_array = [
            [i_seq + i_name, i_phone, "Package"],
            [doc.Merge.CC, doc.Merge.CC, i_addr],
            [doc.Merge.CC, "Total Price: ", i_totalPrice]
            //[doc.Merge.CC, doc.Merge.CC, "Remark:" + i_remark]
        ];
        $(o_id + " .cust_order_item").each(
            function(key,item){
                var p_id = item.id;
                var p_name = $(o_id + " #" + p_id + " [data-type = pName]").text();
                var p_quan = $(o_id + " #" + p_id + " [data-type = pQty]").text();
                var tempAy = [doc.Merge.CC, p_name, p_quan];
                cust_array.push(tempAy);
            }
        );
        cust_array.push([doc.Merge.CC, doc.Merge.CC, "Remark:" + i_remark]);
        doc.addTable(cust_array);
        doc.newLine();
    }
    //====================================================
    doc.addHeader("Summary: ", doc.HeaderType.H3);
    var sAy = [[doc.Merge.CC,"Product","Quantity"]];
    for(i=1; i < 100;i++){
        if(totalOrders[i] !== undefined && totalOrders[i] != 0 ){
            var tAy = [doc.Merge.CC, tqProducts.HM[i], totalOrders[i]];
            sAy.push(tAy);
        }
    }
    doc.addTable(sAy);
    //====================================================
    doc.generate();
}
//========================================================================
function removeUserFromTotalUsers(user){
    var tempArray = [];
    for(i=0;i<totalUsers.length;i++){
        if(totalUsers[i] !== user){
            tempArray.push(totalUsers[i]);
        }
    }
    totalUsers = tempArray;
}
//========================================================================
function removeOrderFromTotalOrders(user){
    var id = "#totalOrders_"+ user;
    $(id + " .cust_order_item").each(
        function(key,item){
            var p_id = item.id.split("_")[2];
            var p_quan = parseInt($(id + " #cust_order_" + p_id + " [data-type = pQty]").text());
            totalOrders[p_id] -= p_quan;
        }
    );

}
//========================================================================
function deleFromTotalOrders(){
    $("[data-totalOrders-checked]").each(
        function(key,item){
            if(item.checked === true){
                removeOrderFromTotalOrders(item.dataset.id);
                removeUserFromTotalUsers(item.dataset.id);
                $("#totalOrders_"+item.dataset.id).remove();
                totalOrdersCount -= 1;
                // $("#total_orders_count").text(totalOrdersCount);
                updateTotalOrderCount(totalOrdersCount);
            }

        }
    );
    // console.log(totalOrders);
}

  //========================================================================
  function deleOrder(){
    var prod_id = $("#tq_prod").val();
    custOrder[prod_id] = 0;
    $("#cust_order_" + prod_id).remove();
    $("#tq_cust_orders_price").text("0");
}
//========================================================================
function updateTotalOrderCount(count){
    $("#total_orders_count").text(count);
    $("#total_orders_count_badge").text(count);
}
//========================================================================
function parseRecord(){
    var text = $("#tq_recordToParse").val().split('/');
    var remark = text[1];
    var comaIdx = text[2].indexOf(':') > -1 ? text[2].indexOf(':') : text[2].indexOf('：');
    var address = text[2].substr(comaIdx+1);
    var phoneIdx = text[3].indexOf(':') > -1 ? text[3].indexOf(':') : text[3].indexOf('：');
    var phone = text[3].substr(phoneIdx+1).replace(" ","").replace(" ","");
    console.log(text);
    // $("#tq_name").val("");
    $("#tq_phone").val(phone);
    $("#tq_address").val(address);
    $("#tq_remark").val(remark);
    // $("#tq_prod").val("0");
    // $("#tq_quan").val("1");
}