var map, infobox;
var infoboxTemplate1 =
  '<div class="arrow_1"></div><div class="customInfobox1">{description}{closeBtn}</div>';
var infoboxTemplate2 =
  '<div class="arrow_2"></div><div class="customInfobox2">{description}{closeBtn}</div>';
var infoboxTemplate3 =
  '<div class="arrow_3"></div><div class="customInfobox3">{description}{closeBtn}</div>';
var infoboxTemplate4 =
  '<div class="arrow_4"></div><div class="customInfobox4">{description}{closeBtn}</div>';

function GetMap() {
  map = new Microsoft.Maps.Map("#myMap", {
    center: new Microsoft.Maps.Location(34.2778, 108.953098),
    zoom: 5,
  });
  //Attention!!! Microsoft.Maps.Location(lat, lon)，latitude first,then the longitude
  var point1 = new Microsoft.Maps.Location(30.581084, 114.3162); //武汉市
  var point2 = new Microsoft.Maps.Location(31.209316, 112.410562); //湖北省
  var point3 = new Microsoft.Maps.Location(39.929986, 116.395645); //国家
  var point4 = new Microsoft.Maps.Location(39.802397, 98.281635); //其他省市
  //create infobox information
  description1 =
    '<div id="box-bottom"><span id="wuhan_startTime">2019/12/31</span><br><span id="wuhan_events"></span></div>';
  description2 =
    '<div id="box-bottom"><span id="hubei_startTime">2019/12/31</span><br><span id="hubei_events"></span></div> ';

  description3 =
    "<div id='box-bottom'><span id='nation_startTime'>2019/12/31</span><br><span id='nation_events'>🔺The National Health Commission's expert team arrived in Wuhan to check and verify the situation</span></div>";

  description4 =
    '<div id="box-bottom"><span id="others_startTime">2019/12/31</span><br><span id="others_events"></span></div> ';

  //Some HTML to add a close button to the infobox.
  var closeButton1 =
    '<a href="javascript:closeInfobox(1)" class="customInfoboxCloseButton">X</a>';
  var closeButton2 =
    '<a href="javascript:closeInfobox(2)" class="customInfoboxCloseButton">X</a>';
  var closeButton3 =
    '<a href="javascript:closeInfobox(3)" class="customInfoboxCloseButton">X</a>';
  var closeButton4 =
    '<a href="javascript:closeInfobox(4)" class="customInfoboxCloseButton">X</a>';

  infobox1 = new Microsoft.Maps.Infobox(point1, {
    // visible: false, //不展示无数据提示框
    htmlContent: infoboxTemplate1
      .replace("{description}", description1)
      .replace("{closeBtn}", closeButton1),

    offset: new Microsoft.Maps.Point(0, -28),
  });
  //Assign the infobox to a map instance.
  infobox1.setMap(map);

  infobox2 = new Microsoft.Maps.Infobox(point2, {
    htmlContent: infoboxTemplate2
      .replace("{description}", description2)
      .replace("{closeBtn}", closeButton2),

    offset: new Microsoft.Maps.Point(-390, -28),
  });
  //Assign the infobox to a map instance.
  infobox2.setMap(map);

  infobox3 = new Microsoft.Maps.Infobox(point3, {
    htmlContent: infoboxTemplate3
      .replace("{description}", description3)
      .replace("{closeBtn}", closeButton3),
    offset: new Microsoft.Maps.Point(0, -28),
  });
  //Assign the infobox to a map instance.
  infobox3.setMap(map);

  infobox4 = new Microsoft.Maps.Infobox(point4, {
    htmlContent: infoboxTemplate4
      .replace("{description}", description4)
      .replace("{closeBtn}", closeButton4),
    offset: new Microsoft.Maps.Point(-390, -28),
  });
  //Assign the infobox to a map instance.
  infobox4.setMap(map);

  //create pushpins
  var pin1 = new Microsoft.Maps.Pushpin(point1, {
    color: "red",
  });
  //Add the pushpin to the map
  map.entities.push(pin1);

  var pin2 = new Microsoft.Maps.Pushpin(point2, {
    color: "yellow",
  });
  map.entities.push(pin2);

  var pin3 = new Microsoft.Maps.Pushpin(point3, {
    color: "blue",
  });
  map.entities.push(pin3);

  var pin4 = new Microsoft.Maps.Pushpin(point4, {
    color: "green",
  });
  map.entities.push(pin4);

  Microsoft.Maps.Events.addHandler(pin1, "click", function () {
    showInfobox(1);
  });
  Microsoft.Maps.Events.addHandler(pin2, "click", function () {
    showInfobox(2);
  });
  Microsoft.Maps.Events.addHandler(pin3, "click", function () {
    showInfobox(3);
  });
  Microsoft.Maps.Events.addHandler(pin4, "click", function () {
    showInfobox(4);
  });
}
function closeInfobox(n) {
  switch (n) {
    case 1:
      infobox1.setOptions({ visible: false });
      break;
    case 2:
      infobox2.setOptions({ visible: false });
      break;
    case 3:
      infobox3.setOptions({ visible: false });
      break;
    case 4:
      infobox4.setOptions({ visible: false });
      break;
  }
}
function showInfobox(n) {
  switch (n) {
    case 1:
      infobox1.setOptions({ visible: true });
      document.getElementsByClassName("customInfobox1")[0].style.display =
        "block";
      document.getElementsByClassName("arrow_1")[0].style.visibility =
        "visible";
      break;
    case 2:
      infobox2.setOptions({ visible: true });
      document.getElementsByClassName("customInfobox2")[0].style.display =
        "block";
      document.getElementsByClassName("arrow_2")[0].style.visibility =
        "visible";
      break;
    case 3:
      infobox3.setOptions({ visible: true });
      document.getElementsByClassName("customInfobox3")[0].style.display =
        "block";
      document.getElementsByClassName("arrow_3")[0].style.visibility =
        "visible";
      break;
    case 4:
      infobox4.setOptions({ visible: true });
      document.getElementsByClassName("customInfobox4")[0].style.display =
        "block";
      document.getElementsByClassName("arrow_4")[0].style.visibility =
        "visible";
      break;
  }
}
