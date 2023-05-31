import {useState, useEffect, useRef, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sampleData} from '../../features/sampleData';
import {storeNewsData} from '../functions/storeNewsData';
import {apiKey, apiUrl} from '../../env';

const itemsPerPage = 10;

const useNewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [pinnedNews, setPinnedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchNews();
    timerRef.current = setInterval(() => {
      updateNews();
    }, 10000);
    return () => clearInterval(timerRef.current);
  }, [apiPage]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${apiUrl}=${apiKey}&page=${apiPage}`);
      const data = await response.json();
      setNewsData(data?.articles?.slice(0, itemsPerPage));
      setCurrentPage(1);
      storeNewsData(data?.articles);
    } catch (error) {}
  };

  const deleteNews = useCallback(
    item => {
      const updatedNews = newsData.filter(news => news?.title !== item?.title);
      setNewsData(updatedNews);
      if (item?.title == pinnedNews?.title) {
        setPinnedNews();
      }
    },
    [newsData, pinnedNews],
  );

  const handlePin = useCallback(item => {
    setPinnedNews(item);
  }, []);

  const updateNews = async () => {
    try {
      const serializedData = await AsyncStorage.getItem('newsData');
      const data = JSON.parse(serializedData);

      // Filter out the data that is already present in newsData
      const filteredData = data.filter(item => {
        return !newsData.find(news => news.title === item.title);
      });

      // Shuffle the filtered data array
      const shuffledData = shuffleArray(filteredData);

      // Take up to 5 items from the shuffled data
      const newData = shuffledData.slice(0, 5);

      // Update the FlatList
      setNewsData(currentData => {
        // Filter out the data that is already present in newsData
        const filteredData = data.filter(item => {
          return !currentData.find(news => news.title === item.title);
        });

        // Shuffle the filtered data array
        const shuffledData = shuffleArray(filteredData);

        // Take up to 5 items from the shuffled data
        const newData = shuffledData.slice(0, 5);

        // Update the FlatList
        return [...currentData, ...newData];
      });
    } catch (error) {}
  };

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = array => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const loadNextNews = useCallback(async () => {
    try {
      // clearTimeout(timerRef.current);
      const serializedData = await AsyncStorage.getItem('newsData');
      const data = JSON.parse(serializedData);
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      if (endIndex >= data.length) {
        setApiPage(prev => prev + 1);
      } else {
        const loadedData = data.slice(startIndex, endIndex);
        setNewsData(prevData => [...prevData, ...loadedData]);
        setCurrentPage(prevPage => prevPage + 1);
      }
    } catch (error) {}
  }, [currentPage]);

  return {
    newsData,
    pinnedNews,
    deleteNews,
    handlePin,
    loadNextNews,
  };
};

export default useNewsList;
