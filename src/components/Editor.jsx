import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';

// constants.js로 상수값들을 저장하는 기능을 가진 파일로 옮김
// const emotionList = [
//   {
//     emotionId: 1,
//     emotionName: '완전 좋음',
//   },
//   {
//     emotionId: 2,
//     emotionName: '좋음',
//   },
//   {
//     emotionId: 3,
//     emotionName: '그럭저럭',
//   },
//   {
//     emotionId: 4,
//     emotionName: '나쁨',
//   },
//   {
//     emotionId: 5,
//     emotionName: '끔찍함',
//   },
// ];

// util/get-stringed-date.js 로 옮김
// const getStringedDate = (targetDate) => {
//   // 날짜: YYYY-MM-DD
//   let year = targetDate.getFullYear();
//   let month = targetDate.getMonth() + 1;
//   let date = targetDate.getDate();

//   if (month < 10) {
//     month = `0${month}`;
//   }
//   if (date < 10) {
//     date = `0${date}`;
//   }

//   return `${year}-${month}-${date}`;
// };

const Editor = ({ initData, onSubmit }) => {
  // const emotionId = 1;
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChageInput = (e) => {
    // console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    // console.log(e.target.value); // 입력된 값이 무엇인지?

    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          value={getStringedDate(input.createdDate)}
          name="createdDate"
          onChange={onChageInput}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChageInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChageInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={'취소하기'} />
        <Button onClick={onClickSubmitButton} text={'작성완료'} type={'POSITIVE'} />
      </section>
    </div>
  );
};

export default Editor;
