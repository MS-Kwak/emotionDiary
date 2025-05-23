import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';
import useDiary from '../hooks/useDiary';
import { getStringedDate } from '../util/get-stringed-date';
import usePageTitle from '../hooks/usePageTitle';

const Diary = () => {
  const params = useParams();
  // console.log(params)
  const nav = useNavigate();
  usePageTitle(`${params.id}번 일기`);

  const curDiaryItem = useDiary(params.id);
  // 첫번째 undefined가 콘솔에 찍히므로, 아래 코드 필요.
  // console.log(curDiaryItem);
  if (!curDiaryItem) {
    return <div>데이터 로딩중...</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div className="Diary">
      <Header
        title={`${title} 기록`}
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={'수정하기'} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
