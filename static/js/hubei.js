(function () {
    let hubei_map =  echarts.init(document.querySelector('.map .chart'))
    hubei_map.showLoading() //数据加载完之前先显示一段简单的loading动画
    axios
      .all([
        axios.get('static/hubei.json'),
        axios.get('static/hb_GDP.json'),
      ])
      .then(
        axios.spread(function (userResp, reposeResp) {
          let HuBeiJson = userResp.data
          //绘制地图
          echarts.registerMap('hubei',HuBeiJson)

          let geoCoordMap = {
            恩施土家族苗族自治州: [109.5007, 30.2563],
            十堰市: [110.5115, 32.3877],
            宜昌市: [111.1707, 30.7617],
            襄阳市: [111.9397, 31.9263],
            黄冈市: [115.2686, 30.6628],
            荆州市: [113.291, 30.0092],
            荆门市: [112.6758, 30.9979],
            咸宁市: [114.2578, 29.6631],
            随州市: [113.4338, 31.8768],
            孝感市: [113.9502, 31.1188],
            武汉市: [114.3896, 30.6628],
            黄石市: [115.0159, 29.9213],
            神农架林区: [110.4565, 31.5802],
            天门市: [113.0273, 30.6409],
            仙桃市: [113.3789, 30.3003],
            潜江市: [112.7637, 30.3607],
            鄂州市: [114.7302, 30.4102],
          }
          let data = reposeResp.data;
        //   let hubeiData = reposeResp.data
        //   for (let i in hubeiData) {
        //     data.push({ name: i, value: hubeiData[i] })
        //   }
          console.log(data);
          let convertData = function (data) {
            let res = []
            for (let i = 0; i < data.length; i++) {
              let geoCoord = geoCoordMap[data[i].name]
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                })
              }
            }
            return res
          }

          let option = {
            title: {
              text: '湖北省各市GDP',
              top: '65px',
              x: 'center',
              textStyle: {
                color: '#ccc',
                fontSize: 20,
              },
            },
            tooltip: {
              trigger: 'item',
              formatter: 
              function (params) {
                if (typeof params.value[2] == 'undefined') {
                  return params.name + ' GDP: ' + params.value
                } else {
                  return params.name + ' GDP: ' + params.value[2]
                }
              },
            },
            legend: {
              orient: 'vertical',
              y: 'bottom',
              x: 'right',
              data: ['各市GDP'],
              textStyle: {
                color: '#fff',
              }

            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {},
              },
            },
            geo: {
              show: true,
              map: 'hubei',
              label: {
                emphasis: {
                    show: true,
                    color: "#fff"   //鼠标指定区域字体颜色
                }
            },
              roam: false, //放大地图
              zoom: 1,
              itemStyle: {
                normal: {
                    areaColor: "rgba(43, 196, 243, 0.42)",  //地图背景色
                    borderColor: "rgba(43, 196, 243, 1)",   //地图·边框色
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2B91B7"  //选中区域地图颜色
                },
              },
            },
            series: [
              {
                name: '各市GDP',
                color: '#7FFF00',  //数据图表颜色
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                // symbolSize: function(val) {
                //   return val[2] / 10;
                // },
              },
            ],
          }
          hubei_map.hideLoading()
          hubei_map.setOption(option)
        })
      )
      .catch((err) => {
        hubei_map.hideLoading()
        console.log(err)
      })
  })()