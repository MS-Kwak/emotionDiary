import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DiaryDispatchContext } from '../App';
import usePageTitle from '../hooks/usePageTitle';

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  // 타이틀 지정
  usePageTitle('새 일기 쓰기');

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    // 새로운 일기를 추가하고, 홈으로 이동하며, 뒤로가기를 방지
    nav('/', { replace: true });
  };

  return (
    <div className="New">
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
