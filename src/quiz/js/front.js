import { useEffect, useState } from 'react';
import '../css/front.css';
import { frontTechnologyData, frontPortfolioData,  } from '../data/front_data';

const Front = () => {

    function randomArray(array) {
        const shuffledArray = [...array]; // 원본 배열 복사
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 0부터 i까지 무작위 인덱스 생성
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // 두 요소 교환
        }
        return shuffledArray;
    }

    const [categorySelect, setCategorySelect] = useState(1);
    const [quizInfo, setQuizInfo] = useState([]);
    const [quizNum, setQuizNum] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState();

    const [easy, setEasy] = useState(true);

    useEffect(() => {
        if (categorySelect === 1) {
            setQuizInfo((frontTechnologyData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false);}
        }
        if (categorySelect === 2) {
            setQuizInfo((frontTechnologyData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false);}
        }
        if (categorySelect === 3) {
            setQuizInfo((frontTechnologyData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false);}
        }
        if (categorySelect === 4) {
            setQuizInfo((frontTechnologyData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false);}
        }
        if (categorySelect === 5) {
            setQuizInfo((frontTechnologyData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false);}
        }
        if (categorySelect === 6) {
            setQuizInfo((frontTechnologyData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false);}
        }
        if (categorySelect === 7) {
            setQuizInfo(randomArray(frontPortfolioData));setQuizNum(0);
            if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false); }
        }
        // if (categorySelect === 20) {
        //     setQuizInfo(randomArray(frontCompanyData)); setQuizNum(0);
        //     if (easy) { setQuizAnswer(true) } else{ setQuizAnswer(false); }
        // }
    }, [categorySelect, easy])

    return(
        <div className='front_container'>
            <div className='front_title_content'>
                프론트엔드 질문 리스트
            </div>
            <div className='front_category_container'>
                <div className='front_category_content'>
                    <div onClick={() => setCategorySelect(1)} style={{ color: categorySelect === 1 ? '#3578FF' : '', backgroundColor: categorySelect === 1 ? 'white' : '' }} className='front_category'>
                        front
                    </div>
                    <div onClick={() => setCategorySelect(2)} style={{ color: categorySelect === 2 ? '#3578FF' : '', backgroundColor: categorySelect === 2 ? 'white' : '' }} className='front_category'>
                        html
                    </div>
                    <div onClick={() => setCategorySelect(3)} style={{ color: categorySelect === 3 ? '#3578FF' : '', backgroundColor: categorySelect === 3 ? 'white' : '' }} className='front_category'>
                        css
                    </div>
                    <div onClick={() => setCategorySelect(4)} style={{ color: categorySelect === 4 ? '#3578FF' : '', backgroundColor: categorySelect === 4 ? 'white' : '' }} className='front_category'>
                        JavaScript
                    </div>
                    <div onClick={() => setCategorySelect(5)} style={{ color: categorySelect === 5 ? '#3578FF' : '', backgroundColor: categorySelect === 5 ? 'white' : '' }} className='front_category'>
                        React
                    </div>
                    <div onClick={() => setCategorySelect(6)} style={{ color: categorySelect === 6 ? '#3578FF' : '', backgroundColor: categorySelect === 6 ? 'white' : '' }} className='front_category'>
                        TypeScript
                    </div>
                    <div onClick={() => setCategorySelect(7)} style={{ color: categorySelect === 7 ? '#3578FF' : '', backgroundColor: categorySelect === 7 ? 'white' : '' }} className='front_category'>
                        포트폴리오
                    </div>
                    {/* <div onClick={() => setCategorySelect(20)} style={{ color: categorySelect === 3 ? '#3578FF' : '', backgroundColor: categorySelect === 3 ? 'white' : '' }} className='front_category'>
                        기업
                    </div> */}
                </div>
            </div>
            <div className='front_quiz_level_content'>
                <div onClick={() => setEasy(true)} className='front_quiz_level_easy_content'>EASY</div>
                <div onClick={() => setEasy(false)} className='front_quiz_level_hard_content'>HARD</div>
            </div>
            <div className='front_quiz_title_container'>
                <div>{quizInfo.length} / {quizNum+1}</div>
            </div>

            <div className='front_quiz_info_container'>
                <div className='front_quiz_info_question_container'>
                    <div className='front_quiz_info_question_title_content'>
                        질문
                    </div>
                    {quizInfo.length > 0 ? ( 
                        <div className='front_quiz_info_question'>{quizInfo[quizNum].question}</div> 
                    ) : ( 
                        <></> 
                    )}
                </div>
                <div className='front_quiz_info_line' />
                <div className='front_quiz_info_answer_container'>
                    <div className='front_quiz_info_question_title_content'>
                        답 
                    </div>
                    {quizInfo.length && quizAnswer > 0 ? ( 
                        <div style={{ whiteSpace: "pre-line" }} className='front_quiz_info_answer'>{quizInfo[quizNum].answer}</div> 
                    ) : ( 
                        <></> 
                    )}
                </div>
            </div>

            <div className='front_quiz_select_container'>
                <div className='front_quiz_select_content' 
                    onClick={() => {
                        setQuizNum((prev) => Math.max(prev - 1, 0)); 
                        if (!easy) {
                            setQuizAnswer(false);
                        }
                    }}
                    style={{ color: quizNum === 0 ? 'rgba(0,0,0,0.2)' : '', border: quizNum === 0 ? '2px solid rgba(0,0,0,0.2)' : '', pointerEvents: quizNum === 0 ? 'none' : ""}}
                >
                    이전
                </div>
                <div className='front_quiz_select_content'
                    onClick={() => setQuizAnswer(true)}
                    style={{color: quizAnswer ? 'rgba(0,0,0,0.2)' : '', border: quizAnswer ? '2px solid rgba(0,0,0,0.2)' : ''}}
                >
                    답 보기
                </div>
                <div className='front_quiz_select_content' 
                    onClick={() => {
                        setQuizNum((prev) => Math.min(prev + 1, quizInfo.length - 1)); 
                        if (!easy) {
                            setQuizAnswer(false);
                        }
                    }}
                    style={{ color: quizNum === quizInfo.length - 1 ? 'rgba(0,0,0,0.2)' : '', border: quizNum ===  quizInfo.length - 1 ? '2px solid rgba(0,0,0,0.2)' : "", pointerEvents: quizNum ===  quizInfo.length - 1 ? 'none' : ""}}
                >
                    다음
                </div>
            </div>
        </div>
    )
}

export default Front;