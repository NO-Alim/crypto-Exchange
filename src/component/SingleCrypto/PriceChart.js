import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useGetCryptoHistoryQuery } from '../../features/coinRanking/coinRankingApi';
import { precisionRound } from '../../utils/PrecisionRound';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
const PriceChart = ({ coin }) => {
  const { uuid: referenceCurrencyUuid } = useSelector(
    (state) => state.currencies
  );
  const { uuid } = coin;
  const timePeriod = '7d';

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
      text: `Price Movement of ${timePeriod}`,
      align: 'left',
      style: {
        color: '#fff',
      },
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
        style: {
          color: '#fff',
        },
      },
    },
    xaxis: {
      categories: coinTimestamp,
      title: {
        text: 'timestamp',
        style: {
          color: '#fff',
        },
      },
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
  };

  useEffect(() => {
    if (fetchedHistory?.data?.history) {
      let prices = fetchedHistory.data.history.map((item) => {
        return precisionRound(Number(item.price), 2);
      });
      let timestamp = fetchedHistory.data.history.map((item) => {
        let convertToTime =
          moment.unix(item.timestamp).format('LL') +
          ' ' +
          moment.unix(item.timestamp).format('LT');
        return convertToTime;
      });
      setCoinPrice(prices);
      setCoinTimestamp(timestamp.reverse());
    }
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
    content = <Error message={error.data} />;
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

  return <div className="section py-10">{content}</div>;
};

export default PriceChart;
