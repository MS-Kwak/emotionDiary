import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';
import Button from './components/Button';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';

// localStorage.setItem을 추가하였으므로 더이상 필요가 없음.
// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date('2025-04-29').getTime(),
//     emotionId: 1,
//     content: '1번 일기내용',
//   },
//   {
//     id: 2,
//     createdDate: new Date('2025-04-27').getTime(),
//     emotionId: 2,
//     content: '2번 일기내용',
//   },
//   {
//     id: 3,
//     createdDate: new Date('2025-03-19').getTime(),
//     emotionId: 3,
//     content: '3번 일기내용',
//   },
// ];

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// Route path='*' 찍어주게 되면 '와일드카드' : switch case문의 디폴트 문과 비슷한거라고 생각하시면 되요~
function App() {
  // 테스트 연습
  const nav = useNavigate();
  const onClickNewDirectButton = () => {
    nav('/new');
  };
  // localStorage.setItem('test', 'hello');
  // // JSON.stringify로 객체를 문자열로 변환하지 않으면 개발자도구 > Application > Storage에서 확인할때 [Object object] 출력됨.
  // // localStorage의 key와 value값은 원시타입만 되기 때문 (숫자 또는 문자열)
  // localStorage.setItem('name', JSON.stringify({ name: '곽민서' }));
  // console.log(localStorage.getItem('test'));
  // // localStorage.getItem에서 name의 value값이 undefined이면 오류가 발생하므로 주의!!
  // console.log(JSON.parse(localStorage.getItem('name')));
  // localStorage.removeItem('test');
  // localStorage.removeItem('name');

  const [isLoading, setIsLoading] = useState(true);

  // onCreate, onUpdate, onDelete
  const reducer = (state, action) => {
    let nextState;

    switch (action.type) {
      case 'INIT':
        return action.data;
      case 'CREATE': {
        // return [action.data, ...state];
        nextState = [action.data, ...state];
        break;
      }
      case 'UPDATE': {
        // ); //   String(item.id) === String(action.data.id) ? action.data : item // return state.map((item) =>
        nextState = state.map((item) =>
          String(item.id) === String(action.data.id) ? action.data : item
        );
        break;
      }
      case 'DELETE': {
        // return state.filter((item) => String(item.id) !== String(action.id));
        nextState = state.filter((item) => String(item.id) !== String(action.id));
        break;
      }
      default:
        return state;
    }
    localStorage.setItem('diary', JSON.stringify(nextState));
    return nextState;
  };
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const sortedData = localStorage.getItem('diary');
    if (!sortedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(sortedData);
    // console.log(parsedData);
    // 아래 forEach이 parsedData가 배열이 아니면 오류가 발생하므로
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    // console.log(maxId);
    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  // 로딩중일때
  if (isLoading) {
    return <div>데이터 로딩중입니다....</div>;
  }

  return (
    <>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/new'}>New</Link>
      </div>
      <div>
        {/* 보통 로그인이나 회원가입 버튼이 이러한 동작을 하죠~ */}
        <Button
          onClick={onClickNewDirectButton}
          text={'New 페이지로 이동 테스트'}
          type={'POSITIVE'}
        />
      </div>

      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* /:id 동적 파라미터를 의미하는 url값 */}
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
