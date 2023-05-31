import {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sampleData} from '../../features/sampleData';
import {storeNewsData} from '../functions/storeNewsData';
import {apiKey} from '../../env';

const itemsPerPage = 5;

const useNewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [pinnedNews, setPinnedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [apiPage]);

  const timerRef = useRef(null);
  const [randomData, setRandomData] = useState([]);

  const fetchNews = async () => {
    try {
      // const response = await fetch(
      //   `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}&page=${apiPage}`,
      // );
      // const data = await response.json();
      // console.log('mamata1 data', data?.articles);
      // setNewsData(data?.articles?.slice(0, itemsPerPage));
      // setCurrentPage(1);
      // storeNewsData(data?.articles);
      console.log('mamata76 data count', sampleData?.length);
      const data = sampleData;
      setNewsData(data?.slice(0, itemsPerPage));
      startTimer(data, data?.slice(0, itemsPerPage));
      storeNewsData(data);
    } catch (error) {
      console.log('Error fetching news:', error);
    }
  };

  const deleteNews = item => {
    const updatedNews = newsData.filter(news => news?.title !== item?.title);
    setNewsData(updatedNews);
    if (item?.title == pinnedNews?.title) {
      setPinnedNews();
    }
  };

  const handlePin = item => {
    setPinnedNews(item);
  };

  const getRandomData = async (data, flatlistData) => {
    console.log('mamata41 getRandomdata called', data, 'dd', flatlistData);

    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
      let duplicate = false;
      for (let j = 0; j < flatlistData.length; j++) {
        if (data[i].title === flatlistData[j].title) {
          duplicate = true;
          // break;
        }
      }
      if (!duplicate) {
        filteredData.push(data[i]);
      }
      setNewsData([...flatlistData, ...filteredData]);
    }

    console.log('mamata42 fil', data);
    console.log('mamata43 fil', filteredData);
  };

  const startTimer = (data, flatlistData) => {
    timerRef.current = setInterval(() => {
      getRandomData(data, flatlistData);
    }, 3000);
  };

  const loadNextNews = async () => {
    console.log('mamata72 load next called');
    try {
      // clearTimeout(timerRef.current);
      // setRandomData([]);
      const serializedData = await AsyncStorage.getItem('newsData');
      const data = JSON.parse(serializedData);
      console.log('mamata31 data', data);
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      if (endIndex >= data.length) {
        console.log('mamata33 ee', endIndex);
        setApiPage(prev => prev + 1);
      } else {
        const loadedData = data.slice(startIndex, endIndex);
        setNewsData(prevData => [...prevData, ...loadedData]);
        setCurrentPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.log('Error loading next news:', error);
    }
  };

  return {
    newsData,
    pinnedNews,
    deleteNews,
    handlePin,
    loadNextNews,
  };
};

export default useNewsList;
