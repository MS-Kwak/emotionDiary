import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import useDiary from '../hooks/useDiary';
import usePageTitle from '../hooks/usePageTitle';

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  usePageTitle(`${params.id}번 일기 수정`);

  // 커스텀 hooks useDiary.jsx 파일로 옮김
  // You should call navigate() in a React.useEffect(), not when your component is first rendered. nav함수는 모든 컴포넌트가 렌더링 된 후에 실행되어야함. nav함수가 2024년 11월 이후부터는 비동기적으로 작동함.
  // const data = useContext(DiaryStateContext);
  // const [curDiaryItem, setCurDiaryItem] = useState();

  // useEffect(() => {
  //   const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));

  //   if (!currentDiaryItem) {
  //     alert('존재하지 않는 일기입니다');
  //     nav('/', { replace: true });
  //   }

  //   setCurDiaryItem(currentDiaryItem);
  // }, [params.id]);
  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      // 일기를 삭제하는 로직
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
    }
    nav('/', { replace: true });
  };

  // const getCurrentDiaryItem = () => {
  //   const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));

  //   if (!currentDiaryItem) {
  //     alert('존재하지 않는 일기입니다');
  //     nav('/', { replace: true });
  //   }

  //   return currentDiaryItem;
  // };

  // const currentDiaryItem = getCurrentDiaryItem();
  // console.log(currentDiaryItem);

  return (
    <div className="Edit">
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => nav(-1)} />}
        rightChild={
          <Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
