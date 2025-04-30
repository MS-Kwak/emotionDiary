// import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { useContext, useState } from 'react';
import { DiaryStateContext } from '../App';
import usePageTitle from '../hooks/usePageTitle';

const getMonthlyData = (pivotDate, data) => {
  // 1일 0시 0분 0초 getTime()은 비교를 위해 타임스탬프 형식으로...
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  // http://localhost:5173/?value=hello
  // const [params, setParams] = useSearchParams();
  // console.log(params.get('value'));
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle('감정 일기장');

  const monthlyData = getMonthlyData(pivotDate, data);
  // console.log(monthlyDate);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const onIecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  return (
    <div className="Home">
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1} 월`}
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} type={'DEFAULT'} />}
        rightChild={<Button onClick={onIecreaseMonth} text={'>'} type={'DEFAULT'} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
