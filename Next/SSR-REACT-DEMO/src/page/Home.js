import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchHomeData } from '../../store/actions/home';

const Home = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.home);

  useEffect(() => {
    // dispatch(fetchHomeData);
  }, []);

  const renderHeader = () => {
    return (
      <Helmet>
        <title>主页</title>
      </Helmet>
    )
  }
  console.log(homeData, 'hh');
  return (
    <>
      {renderHeader()}
      <div>
        这是主页
        {homeData.articles.map(article => (
          <div key={article.id}>{article.title} - {article.content}</div>
        ))}
        <button onClick={() => {console.log('点击')}}>点击</button>
      </div>
    </>
  )
};

Home.getInitialData = async (store) => {
  return store.dispatch(fetchHomeData);
}

export default Home;