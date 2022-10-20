import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useGetCryptoHistoryQuery } from '../../features/coinRanking/coinRankingApi';
import { precisionRound } from '../../utils/PrecisionRound';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
const PriceChart = ({ coin }) => {
  const { uuid: referenceCurrencyUuid, sign } = useSelector(
    (state) => state.currencies
  );
  const { uuid } = coin;
  const [timePeriod, setTimePeriod] = useState('7d');

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

  const timeArr = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

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
      text: `Price Movement`,
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
        text: `price`,
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
        style: {
          display: 'none',
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
  };

  //setting price and timestamp for chart x-axis and y-axis
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

  return (
    <div className="section py-10">
      <div className="pl-3 mb-5 flex flex-wrap items-center gap-5">
        <h2 className="text-lg font-semibold">Select Time Period</h2>
        <>
          {timeArr.map((item) => {
            return (
              <div
                className={`px-2  text-background rounded cursor-pointer ${
                  item === timePeriod ? 'bg-brand' : 'bg-brand/70'
                }`}
                key={item}
                onClick={() => setTimePeriod(item)}
              >
                {item}
              </div>
            );
          })}
        </>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default PriceChart;
