import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useGetCryptoHistoryQuery } from '../../features/coinRanking/coinRankingApi';
import { precisionRound } from '../../utils/PrecisionRound';
import LoaderSpin from '../ui/LoaderSpin';
const PriceChart = ({ coin }) => {
  const { uuid: referenceCurrencyUuid } = useSelector(
    (state) => state.currencies
  );
  const { uuid } = coin;
  const timePeriod = '24h';

  const {
    data: fetchedHistory,
    isLoading,
    isError,
    error,
  } = useGetCryptoHistoryQuery({
    coinId: uuid,
    timePeriod: timePeriod,
    referenceCurrencyUuid: referenceCurrencyUuid,
  });

  //for line chart
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);

  const series = [
    {
      name: 'Price',
      data: coinPrice,
    },
  ];
  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        coinPrice,
      },
      title: {
        text: 'price',
      },
    },
    xaxis: {
      labels: {
        formatter: function (coinTimestamp) {
          return moment.unix(coinTimestamp).format('LT');
        },
      },
      title: {
        text: 'timestamp',
      },
    },
  };

  useEffect(() => {
    if (fetchedHistory?.data?.history) {
      let prices = fetchedHistory.data.history.map((item) => {
        return precisionRound(Number(item.price), 2);
      });
      let timestamp = fetchedHistory.data.history.map((item) => {
        return item.timestamp;
      });
      setCoinPrice(prices);
      setCoinTimestamp(timestamp);
    }
    coinTimestamp.map((item) => {
      console.log(moment.unix(item).format('LT'));
    });
  }, [fetchedHistory]);

  let content;

  if (isLoading) {
    content = (
      <div className="w-full flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <h2>Some Thing wrong!</h2>;
  }

  if (!isLoading && !isError && fetchedHistory?.data?.history?.length > 0) {
    content = (
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    );
  }

  return (
    <div className="section py-0">
      <div className="border-b border-brand/50 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Price Chart</h2>
          </div>
          <div>hello</div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default PriceChart;
